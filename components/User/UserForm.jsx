import { range } from 'lodash';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Col, ControlLabel, FormControl, FormGroup, HelpBlock, Row } from 'react-bootstrap';

import { UserType } from '../../constants/propTypes';

const exists = value => !!(value && value.trim());

const FIELDS = {
  name: {
    error: 'Please enter a name.',
    isValid: exists,
    label: 'Name',
    required: true,
  },
  email: {
    error: 'Please enter a valid email address.',
    isValid: value => exists(value) && value.indexOf('@') > -1,
    label: 'Email',
    required: true,
  },
  phone: {
    label: 'Phone',
  },
};

const GENDERS = [
  'Male',
  'Female',
  'Other',
];

const DAYS = range(1, 32);
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const YEARS = range(1900, (new Date()).getFullYear() + 1).reverse();

const UserForm = ({ errors, onChange, user }) => (
  <Fragment>
    {Object.keys(FIELDS).map((name) => {
      const error = errors[name];
      const field = FIELDS[name];
      return (
        <FormGroup key={name} validationState={error ? 'error' : null}>
          <ControlLabel>{field.label}</ControlLabel>
          <FormControl
            name={name}
            onChange={onChange}
            type={field.type || 'text'}
            value={user[name] || ''}
          />
          {error ? <HelpBlock>{error}</HelpBlock> : null}
        </FormGroup>
      );
    })}
    <FormGroup>
      <ControlLabel>Gender</ControlLabel>
      <FormControl
        componentClass="select"
        name="gender"
        onChange={onChange}
        value={user.gender || ''}>
        <option value={-1}>Select a gender...</option>
        {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
      </FormControl>
    </FormGroup>
    <FormGroup>
      <ControlLabel>Birthday</ControlLabel>
      <Row>
        <Col md={4}>
          <FormControl
            componentClass="select"
            name="birthMonth"
            onChange={onChange}
            value={user.birthMonth || ''}>
            <option value={-1}>Select a month...</option>
            {MONTHS.map((m, idx) => <option key={m} value={idx}>{m}</option>)}
          </FormControl>
        </Col>
        <Col md={4}>
          <FormControl
            componentClass="select"
            name="birthDate"
            onChange={onChange}
            value={user.birthDate || ''}>
            <option value={-1}>Select a day...</option>
            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
          </FormControl>
        </Col>
        <Col md={4}>
          <FormControl
            componentClass="select"
            name="birthYear"
            onChange={onChange}
            value={user.birthYear || ''}>
            <option value={-1}>Select a year...</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </FormControl>
        </Col>
      </Row>
    </FormGroup>
  </Fragment>
);

UserForm.validate = (user) => {
  const errors = {};
  Object.keys(FIELDS).forEach((name) => {
    const field = FIELDS[name];
    if (field.isValid && !field.isValid(user[name])) {
      errors[name] = field.error;
    }
  });
  return errors;
};

UserForm.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  user: UserType.isRequired,
};

export default UserForm;
