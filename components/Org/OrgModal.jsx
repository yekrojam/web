// @flow

import { isEmpty } from 'lodash';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import Loader from '../Loader/Loader';
import OrgForm from './OrgForm';

import { Org } from '../../constants/types';

type Props = {
  isLoading: bool,
  onDelete: Function,
  onHide: Function,
  onSave: Function,
  show: bool,
  org?: Org,
};

type State = {
  errors: Object,
  org: Org | {},
};

const getInitialState = props => ({
  errors: {},
  org: props.org || {},
});

class OrgModal extends React.Component<Props, State> {
  state = getInitialState(this.props);

  render() {
    const { isLoading, onDelete, onHide, show, org } = this.props;

    const contents = isLoading ?
      <Loader /> :
      <OrgForm
        {...this.state}
        onChange={this._handleChange}
      />;

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

  _handleChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    this.setState((state, props) => ({
      org: {
        ...state.org,
        [name]: value,
      },
    }));
  }

  _handleEnter = () => {
    this.setState(getInitialState(this.props));
  }

  _handleSave = () => {
    const { org } = this.state;
    const errors = OrgForm.validate(org);

    if (!isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    this.props.onSave(org);
  }
}

export default OrgModal;
