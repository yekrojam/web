// @flow

import React, { Fragment } from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

import { notBlank, validate } from '../../utils/forms';
import { Org } from '../../constants/types';

type Props = {
  errors: Object,
  onChange: Function,
  org: Org,
};

const FIELDS = [
  {
    error: 'Please enter a name.',
    isValid: notBlank,
    label: 'Name',
    name: 'name',
    required: true,
  },
  {
    error: 'Please enter a description.',
    isValid: notBlank,
    label: 'Description',
    name: 'description',
    required: true,
    fieldProps: {
      componentClass: 'textarea',
      placeholder: 'Enter a description...',
    },
  },
  {
    error: 'Please enter a URL slug.',
    isValid: notBlank,
    label: 'URL Slug',
    name: 'urlSlug',
    required: true,
  },
];

const OrgForm = (props: Props) => {
  const { errors, onChange, org } = props;

  return (
    <Fragment>
      {FIELDS.map(({ label, name, ...rest }) => {
        const error = errors[name];
        const fieldProps = rest.fieldProps || {};

        return (
          <FormGroup key={name} validationState={error ? 'error' : null}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl
              {...fieldProps}
              name={name}
              onChange={onChange}
              value={org[name] || ''}
            />
            {error ? <HelpBlock>{error}</HelpBlock> : null}
          </FormGroup>
        );
      })}
    </Fragment>
  );
};

OrgForm.validate = org => validate(org, FIELDS);

export default OrgForm;
