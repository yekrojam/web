import { isEmpty } from 'lodash';
import React, { Fragment } from 'react';
import { Button, ControlLabel, FormControl, FormGroup, HelpBlock, Modal } from 'react-bootstrap';

import Loader from '../Loader/Loader';

const exists = value => !!(value && value.trim());

const FIELDS = {
  email: {
    error: 'Please enter a valid user email.',
    isValid: value => exists(value) && value.indexOf('@') > -1,
    label: 'Email',
  },
  name: {
    error: 'Please enter a user name.',
    isValid: exists,
    label: 'Name',
  },
};

const getInitialState = props => ({
  errors: {},
  user: props.user || {},
});

class UserModal extends React.Component {
  state = getInitialState(this.props);

  render() {
    const { onDelete, onHide, show, user } = this.props;

    return (
      <Modal
        onEnter={this._handleEnter}
        onHide={onHide}
        show={!!show}>
        <Modal.Header closeButton>
          <Modal.Title>{user ? 'Edit' : 'Add'} User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this._renderContents()}
        </Modal.Body>
        <Modal.Footer>
          {user ?
            <Button
              bsStyle="link"
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

  _renderContents = () => {
    if (this.props.isLoading) {
      return <Loader />;
    }

    const { errors, user } = this.state;

    return (
      <Fragment>
        {Object.keys(FIELDS).map((field) => {
          const error = errors[field];
          return (
            <FormGroup key={field} validationState={error ? 'error' : null}>
              <ControlLabel>{FIELDS[field].label}</ControlLabel>
              <FormControl
                name={field}
                onChange={this._handleChange}
                type="text"
                value={user[field] || ''}
              />
              {error ? <HelpBlock>{error}</HelpBlock> : null}
            </FormGroup>
          );
        })}
      </Fragment>
    );
  }

  _handleChange = (e) => {
    const { name, value } = e.target;

    this.setState((state, props) => ({
      user: {
        ...state.user,
        [name]: value,
      },
    }));
  }

  _handleEnter = (e) => {
    this.setState(getInitialState(this.props));
  }

  _handleSave = (e) => {
    const { user } = this.state;

    // Basic client-side validation.
    const errors = {};
    Object.keys(FIELDS).forEach((name) => {
      const field = FIELDS[name];
      if (!field.isValid(user[name])) {
        errors[name] = field.error;
      }
    });

    if (!isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    this.props.onSave(user);
  }
}

export default UserModal;
