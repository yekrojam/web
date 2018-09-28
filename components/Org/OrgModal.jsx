import { isEmpty } from 'lodash';
import React, { Fragment } from 'react';
import { Button, ControlLabel, FormControl, FormGroup, HelpBlock, Modal } from 'react-bootstrap';

import Loader from '../Loader/Loader';

const exists = value => !!(value && value.trim());

const FIELDS = {
  name: {
    error: 'Please enter a name.',
    isValid: exists,
    label: 'Name',
    required: true,
  },
  description: {
    error: 'Please enter a description.',
    isValid: exists,
    label: 'Description',
    required: true,
    props: {
      componentClass: 'textarea',
      placeholder: 'Enter a description...',
    },
  },
  urlSlug: {
    error: 'Please enter a URL slug.',
    isValid: exists,
    label: 'URL Slug',
    required: true,
  },
};

const getInitialState = props => ({
  errors: {},
  org: props.org || {},
});

class OrgModal extends React.Component {
  state = getInitialState(this.props);

  render() {
    const { isLoading, onDelete, onHide, show, org } = this.props;

    const contents = isLoading ?
      <Loader /> :
      <Fragment>
        {Object.keys(FIELDS).map((name) => {
          const error = this.state.errors[name];
          const field = FIELDS[name];
          const props = field.props || {};

          return (
            <FormGroup key={name} validationState={error ? 'error' : null}>
              <ControlLabel>{field.label}</ControlLabel>
              <FormControl
                {...props}
                name={name}
                onChange={this._handleChange}
              />
              {error ? <HelpBlock>{error}</HelpBlock> : null}
            </FormGroup>
          );
        })}
      </Fragment>;

    return (
      <Modal
        onEnter={this._handleEnter}
        onHide={onHide}
        show={!!show}>
        <Modal.Header closeButton>
          <Modal.Title>{org ? 'Edit' : 'Add'} Org</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contents}
        </Modal.Body>
        <Modal.Footer>
          {org ?
            <Button
              bsStyle="danger"
              onClick={() => onDelete(org.id)}
              style={{ float: 'left' }}>
              Delete
            </Button> :
            null
          }
          <Button onClick={onHide}>Close</Button>
          <Button
            bsStyle="primary"
            onClick={this._handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  _handleChange = (e) => {
    const { name, value } = e.target;

    this.setState((state, props) => ({
      org: {
        ...state.org,
        [name]: value,
      },
    }));
  }

  _handleEnter = (e) => {
    this.setState(getInitialState(this.props));
  }

  _handleSave = (e) => {
    const { org } = this.state;

    // Basic client-side validation.
    const errors = {};
    Object.keys(FIELDS).forEach((name) => {
      const field = FIELDS[name];
      if (field.isValid && !field.isValid(org[name])) {
        errors[name] = field.error;
      }
    });

    if (!isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    this.props.onSave(org);
  }
}

export default OrgModal;
