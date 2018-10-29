import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, ButtonToolbar, FormControl, Label, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../Loader/Loader';
import MemberImage from '../User/MemberImage';
import PageHeader from '../Page/PageHeader';
import UserModal from '../User/UserModal';

import { createMember, deleteUser, fetchMembers, updateUser } from '../../actions';
import ActionTypes from '../../constants/ActionTypes';
import { UserType } from '../../constants/propTypes';
import { getUserName } from '../../utils/userUtils';
import { isComplete, isPending } from '../../utils/actionTypes';

class MembersAdmin extends React.Component {
  state = {
    filter: '',
    show: false,
    user: null,
  };

  componentDidMount() {
    this.props.fetchMembers();
  }

  componentWillReceiveProps({ requests }) {
    const types = [
      ActionTypes.MEMBER_CREATE,
      ActionTypes.USER_DELETE,
      ActionTypes.USER_UPDATE,
    ];

    // TODO: Check for server-side errors and keep the modal open in that case.
    if (isComplete(requests, types)) {
      this._handleModalHide();
    }
  }

  render() {
    const { requests } = this.props;
    const { show, user } = this.state;

    const isLoading = isPending(requests, [
      ActionTypes.MEMBER_CREATE,
      ActionTypes.USER_DELETE,
      ActionTypes.USER_UPDATE,
    ]);

    return (
      <Fragment>
        <PageHeader title="Members">
          <ButtonToolbar>
            <Button onClick={this._handleModalShow}>
              Add Member
            </Button>
            <FormControl
              className="user-filter"
              onChange={this._handleFilter}
              placeholder="Search..."
            />
          </ButtonToolbar>
        </PageHeader>
        {this._renderContents()}
        <UserModal
          isLoading={isLoading}
          onDelete={this._handleDelete}
          onHide={this._handleModalHide}
          onSave={this._handleSave}
          show={show}
          user={user}
        />
      </Fragment>
    );
  }

  _renderContents = () => {
    const { requests, users } = this.props;

    if (isEmpty(users) || isPending(requests, ActionTypes.MEMBERS_FETCH)) {
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
      <Table bordered className="member-table" condensed hover striped>
        <thead>
          <tr>
            <th>Member</th>
            <th>Id</th>
            <th>Roles</th>
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
          <MemberImage size="small" user={user} />
          {getUserName(user)}
        </Link>
      </td>
      <td>{user.id}</td>
      <td>
        {user.roles.map(role => (
          <Label key={`${user.id}-${role}`}>
            {role}
          </Label>
        ))}
      </td>
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

  _handleModalShow = (e, user) => {
    this.setState({
      show: true,
      user,
    });
  }

  _handleDelete = (userId) => {
    /* eslint-disable-next-line no-restricted-globals, no-alert */
    if (confirm('Are you sure you want to delete this member?')) {
      this.props.deleteUser(userId);
    }
  }

  _handleSave = (user) => {
    if (this.state.user) {
      this.props.updateUser(user);
      return;
    }

    this.props.createMember(user);
  }
}

MembersAdmin.propTypes = {
  users: PropTypes.arrayOf(UserType),
};

const mapStateToProps = ({ org, requests, users }) => ({
  org,
  requests,
  users,
});

const mapDispatchToProps = dispatch => ({
  createMember: member => dispatch(createMember(member)),
  deleteUser: userId => dispatch(deleteUser(userId)),
  fetchMembers: () => dispatch(fetchMembers()),
  updateUser: user => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MembersAdmin);
