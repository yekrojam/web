import { isEmpty } from 'lodash';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import Loader from '../Loader/Loader';
import UserForm from './UserForm';

const getInitialState = props => ({
  errors: {},
  user: props.user || {},
});

class UserModal extends React.Component {
  state = getInitialState(this.props);

  render() {
    const { isLoading, onDelete, onHide, show, user } = this.props;

    const contents = isLoading ?
      <Loader /> :
      <UserForm
        {...this.state}
        onChange={this._handleChange}
      />;

    return (
      <Modal
        onEnter={this._handleEnter}
        onHide={onHide}
        show={!!show}>
        <Modal.Header closeButton>
          <Modal.Title>{user ? 'Edit' : 'Add'} User</Modal.Title>
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
    const errors = UserForm.validate(user);

    if (!isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    this.props.onSave(user);
  }
}

export default UserModal;
