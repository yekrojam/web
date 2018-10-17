import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, ButtonToolbar, FormControl, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import MembershipModal from '../../components/Membership/MembershipModal';
import Page from '../../components/Page/Page';
import PageHeader from '../../components/Page/PageHeader';
import UserModal from '../../components/User/UserModal';

import { createMembership, createUser, deleteUser, fetchUsers, updateUser } from '../../actions';
import ActionTypes from '../../constants/ActionTypes';
import { UserType } from '../../constants/propTypes';
import getUserName from '../../utils/getUserName';
import { isComplete, isPending } from '../../utils/actionTypes';

import './styles/AdminController.scss';

/**
 * AdminController
 *
 * Admin dashboard for adding, editing, and removing users and permissions.
 */
class AdminController extends React.Component {
  state = {
    filter: '',
    membership: null,
    show: false,
    user: null,
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentWillReceiveProps({ pendingRequests }) {
    const types = [
      ActionTypes.MEMBERSHIP_CREATE,
      ActionTypes.USER_CREATE,
      ActionTypes.USER_DELETE,
      ActionTypes.USER_UPDATE,
    ];

    // TODO: Check for server-side errors and keep the modal open in that case.
    if (isComplete(pendingRequests, types)) {
      this._handleModalHide();
    }
  }

  render() {
    const { pendingRequests, users } = this.props;
    const { membership, show, user } = this.state;

    const isLoading = isPending(pendingRequests, [
      ActionTypes.MEMBERSHIP_CREATE,
      ActionTypes.USER_CREATE,
      ActionTypes.USER_DELETE,
      ActionTypes.USER_UPDATE,
    ]);

    return (
      <Page className="admin" title="Admin">
        <PageHeader title="Users">
          <ButtonToolbar>
            <Button onClick={this._handleModalShow}>
              Add User
            </Button>
            <Button onClick={this._handleMembershipModalShow}>
              Add Membership
            </Button>
            <FormControl
              className="user-filter"
              onChange={this._handleFilter}
              placeholder="Search..."
            />
          </ButtonToolbar>
        </PageHeader>
        {this._renderContents()}
        <MembershipModal
          isLoading={isLoading}
          onHide={this._handleModalHide}
          onSave={this._handleMembershipSave}
          membership={membership}
          show={show === 'membership'}
          users={users || []}
        />
        <UserModal
          isLoading={isLoading}
          onDelete={this._handleDelete}
          onHide={this._handleModalHide}
          onSave={this._handleSave}
          show={show === 'user'}
          user={user}
        />
      </Page>
    );
  }

  _renderContents = () => {
    const { pendingRequests, users } = this.props;

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
            <th className="controls" />
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </Table>
    );
  }

  _renderUserRow = user => (
    <tr key={user.id}>
      <td>
        <Link to={{ pathname: `/users/${user.id}` }}>
          {getUserName(user)}
        </Link>
      </td>
      <td>{user.id}</td>
      <td>
        <Button
          bsSize="xs"
          bsStyle="default"
          onClick={e => this._handleModalShow(e, user)}>
          Edit
        </Button>
      </td>
    </tr>
  )

  _handleFilter = (e) => {
    this.setState({ filter: e.target.value });
  }

  _handleModalHide = () => {
    this.setState({ show: false });
  }

  _handleMembershipModalShow = (e, membership) => {
    this.setState({
      membership,
      show: 'membership',
    });
  }

  _handleModalShow = (e, user) => {
    this.setState({
      show: 'user',
      user,
    });
  }

  _handleDelete = (userId) => {
    /* eslint-disable-next-line no-restricted-globals, no-alert */
    if (confirm('Are you sure you want to delete this user?')) {
      this.props.deleteUser(userId);
    }
  }

  _handleMembershipSave = (membership) => {
    this.props.createMembership({
      ...membership,
      org: this.props.org.id,
    });
  }

  _handleSave = (user) => {
    if (this.state.user) {
      this.props.updateUser(user);
      return;
    }

    this.props.createUser(user);
  }
}

AdminController.propTypes = {
  users: PropTypes.arrayOf(UserType),
};

const mapStateToProps = ({ org, pendingRequests, users }) => ({
  org,
  pendingRequests,
  users,
});

const mapDispatchToProps = dispatch => ({
  createMembership: membership => dispatch(createMembership(membership)),
  createUser: user => dispatch(createUser(user)),
  deleteUser: userId => dispatch(deleteUser(userId)),
  fetchUsers: () => dispatch(fetchUsers()),
  updateUser: user => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminController);
