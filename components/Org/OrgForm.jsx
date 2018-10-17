import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

import { notBlank, validate } from '../../utils/forms';

const FIELDS = {
  name: {
    error: 'Please enter a name.',
    isValid: notBlank,
    label: 'Name',
    required: true,
  },
  description: {
    error: 'Please enter a description.',
    isValid: notBlank,
    label: 'Description',
    required: true,
    props: {
      componentClass: 'textarea',
      placeholder: 'Enter a description...',
    },
  },
  urlSlug: {
    error: 'Please enter a URL slug.',
    isValid: notBlank,
    label: 'URL Slug',
    required: true,
  },
};

const OrgForm = ({ errors, onChange, org }) => (
  <Fragment>
    {Object.keys(FIELDS).map((name) => {
      const error = errors[name];
      const field = FIELDS[name];
      const fieldProps = field.props || {};

      return (
        <FormGroup key={name} validationState={error ? 'error' : null}>
          <ControlLabel>{field.label}</ControlLabel>
          <FormControl
            {...fieldProps}
            name={name}
            onChange={onChange}
          />
          {error ? <HelpBlock>{error}</HelpBlock> : null}
        </FormGroup>
      );
    })}
  </Fragment>
);

OrgForm.validate = org => validate(org, FIELDS);

OrgForm.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  org: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default OrgForm;
