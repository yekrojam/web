import { isEmpty } from 'lodash';
import React, { Fragment } from 'react';
import { Button, Checkbox, ControlLabel, FormGroup, HelpBlock, Modal } from 'react-bootstrap';

import Loader from '../Loader/Loader';
import UserForm from './UserForm';

const ROLES = [
  'Member',
  'Admin',
];

const FIELDS = [
  {
    error: 'Please select at least one role for the user.',
    isValid: roles => roles && roles.length,
    name: 'roles',
    required: true,
  },
];

const getInitialState = props => ({
  errors: {},
  user: props.user || {},
});

class UserModal extends React.Component {
  state = getInitialState(this.props);

  render() {
    const { isLoading, onDelete, onHide, show, user } = this.props;
    const { errors } = this.state;

    const contents = isLoading ?
      <Loader /> :
      <Fragment>
        <UserForm
          {...this.state}
          onChange={this._handleChange}
        />
        <FormGroup validationState={errors.roles ? 'error' : null}>
          <ControlLabel>Roles</ControlLabel>
          {ROLES.map(this._renderRole)}
          {errors.roles ? <HelpBlock>{errors.roles}</HelpBlock> : null}
        </FormGroup>
      </Fragment>;

    return (
      <Modal
        onEnter={this._handleEnter}
        onHide={onHide}
        show={!!show}>
        <Modal.Header closeButton>
          <Modal.Title>{user ? 'Edit' : 'Add'} Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contents}
        </Modal.Body>
        <Modal.Footer>
          {user ?
            <Button
              bsStyle="danger"
              onClick={() => onDelete(user.id)}
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

  _renderRole = (role) => {
    const { user } = this.state;
    const value = role.toUpperCase();
    const checked = !!(user && user.roles) && user.roles.indexOf(value) > -1;

    return (
      <Checkbox
        checked={checked}
        key={value}
        name="roles"
        onChange={this._handleRoleChange}
        value={value}>
        {role}
      </Checkbox>
    );
  }

  _updateUser = (key, value) => {
    this.setState((state, props) => ({
      user: {
        ...state.user,
        [key]: value,
      },
    }));
  }

  _handleChange = (e) => {
    const { name, value } = e.target;
    this._updateUser(name, value);
  }

  _handleRoleChange = (e) => {
    const { user } = this.state;
    const { checked, value } = e.target;

    let roles = user.roles ? user.roles.slice() : [];

    if (checked) {
      roles.push(value);
    } else {
      roles = roles.filter(r => r !== value);
    }

    this._updateUser('roles', roles);
  }

  _handleEnter = (e) => {
    this.setState(getInitialState(this.props));
  }

  _handleSave = (e) => {
    const { user } = this.state;

    // Basic client-side validation.
    const errors = UserForm.validate(user, FIELDS);

    if (!isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    this.props.onSave(user);
  }
}

export default UserModal;
