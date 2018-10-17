import { isEmpty } from 'lodash';
import React, { Fragment } from 'react';
import { Button, ControlLabel, FormControl, FormGroup, HelpBlock, Modal } from 'react-bootstrap';

import Loader from '../Loader/Loader';
import validate from '../../utils/validate';

const exists = value => !!(value && value.trim());

const FIELDS = {
  user: {
    error: 'Please select a user.',
    isValid: exists,
    label: 'User',
    required: true,
  },
};

const getInitialState = props => ({
  errors: {},
  membership: props.membership || {},
});

class MembershipModal extends React.Component {
  state = getInitialState(this.props);

  render() {
    const { isLoading, membership, onDelete, onHide, show } = this.props;

    const contents = isLoading ?
      <Loader /> :
      <Fragment>
        {Object.keys(FIELDS).map((name) => {
          const error = this.state.errors[name];
          const field = FIELDS[name];
          const options = this.props[`${name}s`];

          return (
            <FormGroup key={name} validationState={error ? 'error' : null}>
              <ControlLabel>{field.label}</ControlLabel>
              <FormControl
                componentClass="select"
                name={name}
                onChange={this._handleChange}>
                <option value={-1}>Select a {name}...</option>
                {options.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </FormControl>
              {error ? <HelpBlock>{error}</HelpBlock> : null}
            </FormGroup>
          );
        })}
        <FormGroup>
          <ControlLabel>Roles</ControlLabel>
          <FormControl
            componentClass="select"
            multiple
            name="roles"
            onChange={this._handleChange}>
            <option value="ADMIN">Admin</option>
            <option value="MEMBER">Member</option>
          </FormControl>
        </FormGroup>
      </Fragment>;

    return (
      <Modal
        onEnter={this._handleEnter}
        onHide={onHide}
        show={!!show}>
        <Modal.Header closeButton>
          <Modal.Title>{membership ? 'Edit' : 'Add'} Membership</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contents}
        </Modal.Body>
        <Modal.Footer>
          {membership ?
            <Button
              bsStyle="danger"
              onClick={() => onDelete(membership.id)}
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

    let val = value;

    if (name === 'roles') {
      val = [];
      const { options } = e.target;
      for (let ii = 0; ii < options.length; ii += 1) {
        const option = options[ii];
        if (option.selected) {
          val.push(option.value);
        }
      }
    }

    this.setState((state, props) => ({
      membership: {
        ...state.membership,
        [name]: val,
      },
    }));
  }

  _handleEnter = (e) => {
    this.setState(getInitialState(this.props));
  }

  _handleSave = (e) => {
    const { membership } = this.state;

    // Basic client-side validation.
    const errors = validate(membership, FIELDS);

    if (!isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    this.props.onSave(membership);
  }
}

export default MembershipModal;
