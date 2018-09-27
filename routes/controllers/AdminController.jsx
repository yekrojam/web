import {isEmpty} from 'lodash';
import md5 from 'md5';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Button, FormControl, Modal, Table} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import Page from '../../components/Page/Page';
import PageHeader from '../../components/Page/PageHeader';
import UserModal from '../../components/User/UserModal';

import {createUser, deleteUser, fetchUsers, updateUser} from '../../actions';
import ActionTypes from '../../constants/ActionTypes';
import getUserName from '../../utils/getUserName';
import requestCompleted from '../../utils/requestCompleted';
import serialize from '../../utils/serialize';

const getImageUrl = ({email, imageUrl}) => {
  if (imageUrl) {
    return imageUrl;
  }

  const queryString = serialize({
    d: 'identicon',
    s: 480,
  });

  // Display a default image.
  return `https://s.gravatar.com/avatar/${md5(email)}?${queryString}`;
};

/**
 * AdminController
 *
 * Admin dashboard for adding, editing, and removing users and permissions.
 */
class AdminController extends React.Component {
  state = {
    filter: '',
    show: false,
    user: null,
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    const requests = [
      ActionTypes.USER_CREATE,
      ActionTypes.USER_DELETE,
      ActionTypes.USER_UPDATE,
    ];

    // TODO: Check for server-side errors and keep the modal open in that case.
    if (requestCompleted(this.props, nextProps, requests)) {
      this._handleModalHide();
    }
  }

  render() {
    const {pendingRequests} = this.props;

    const isLoading =
      pendingRequests[ActionTypes.USER_CREATE] ||
      pendingRequests[ActionTypes.USER_DELETE] ||
      pendingRequests[ActionTypes.USER_UPDATE];

    return (
      <Page title="Admin">
        <PageHeader title="Users">
          <Button onClick={this._handleModalShow}>
            Add User
          </Button>
          <FormControl
            onChange={this._handleFilter}
            placeholder="Filter users..."
            style={{
              display: 'inline-block',
              marginLeft: '5px',
              verticalAlign: 'middle',
              width: '300px',
            }}
          />
        </PageHeader>
        {this._renderContents()}
        <UserModal
          isLoading={isLoading}
          onDelete={this._handleDelete}
          onHide={this._handleModalHide}
          onSave={this._handleSave}
          show={this.state.show}
          user={this.state.user}
        />
      </Page>
    );
  }

  _renderContents = () => {
    const {pendingRequests, users} = this.props;

    if (isEmpty(users) || pendingRequests[ActionTypes.USERS_FETCH]) {
      return <Loader />;
    }

    const rows = users.filter((user) => {
      const name = getUserName(user).toLowerCase();
      return name.indexOf(this.state.filter.toLowerCase()) !== -1;
    });

    const content = rows.length ?
      rows.map(this._renderUserRow) :
      <tr>
        <td colSpan={3}>No users to display.</td>
      </tr>;

    return (
      <Table bordered condensed hover striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
            <th style={{width: '10px'}}></th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </Table>
    );
  }

  _renderUserRow = (user) => {
    return (
      <tr key={user.id}>
        <td>
          <Link to={{pathname: `/users/${user.id}`}}>
            {getUserName(user)}
          </Link>
        </td>
        <td>{user.id}</td>
        <td>
          <Button
            bsSize="xs"
            bsStyle="default"
            onClick={(e) => this._handleModalShow(e, user)}>
            Edit
          </Button>
        </td>
      </tr>
    );
  }

  _handleFilter = (e) => {
    this.setState({filter: e.target.value});
  }

  _handleModalHide = () => {
    this.setState({show: false});
  }

  _handleModalShow = (e, user) => {
    this.setState({
      show: true,
      user,
    });
  }

  _handleDelete = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      this.props.deleteUser(userId);
    }
  }

  _handleSave = (user) => {
    this.state.user ?
      this.props.updateUser(user) :
      this.props.createUser({
        ...user,
        // Defaults. TODO: Handle this better...
        auth: `auth0|${(Math.random() * 1000000000).toFixed(0)}`,
        imageUrl: getImageUrl(user),
      });
  }
}

AdminController.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = ({pendingRequests, users}) => ({
  pendingRequests,
  users,
});

const mapDispatchToProps = (dispatch) => ({
  createUser: (user) => dispatch(createUser(user)),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
  fetchUsers: () => dispatch(fetchUsers()),
  updateUser: (user) => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminController);