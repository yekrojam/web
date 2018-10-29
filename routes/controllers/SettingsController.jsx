// @flow

import { find, isEmpty, isEqual } from 'lodash';
import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import Loader from '../../components/Loader/Loader';
import Page from '../../components/Page/Page';
import PageHeader from '../../components/Page/PageHeader';
import UserForm from '../../components/User/UserForm';

import { fetchMember, updateUser } from '../../actions';
import ActionTypes from '../../constants/ActionTypes';
import { Session, User } from '../../constants/types';

type Props = {
  fetchMember: Function,
  requests: Object,
  session: Session,
  updateUser: Function,
  user: User,
};

type State = {
  errors: Object,
  user: User | {},
};

const getInitialState = props => ({
  errors: {},
  user: props.user || {},
});

/**
 * SettingsController
 */
class SettingsController extends React.Component<Props, State> {
  state = getInitialState(this.props);

  componentDidMount() {
    const { session, user } = this.props;
    if (isEmpty(user)) {
      this.props.fetchMember(session.user.id);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!isEqual(nextProps.user, this.props.user)) {
      this.setState(getInitialState(nextProps));
    }
  }

  render() {
    const { requests, user } = this.props;
    const title = 'Settings';

    const isLoading = isEmpty(user) || requests[ActionTypes.MEMBER_FETCH];

    const contents = isLoading ?
      <Loader /> :
      <UserForm
        errors={this.state.errors}
        onChange={this._handleChange}
        user={this.state.user}
      />;

    return (
      <Page className="settings" title={title}>
        <PageHeader title={title}>
          <Button
            bsStyle="primary"
            disabled={isLoading || isEqual(user, this.state.user)}
            onClick={this._handleSave}>
            Save Changes
          </Button>
        </PageHeader>
        {contents}
      </Page>
    );
  }

  _handleChange = (e) => {
    const { name, value } = e.target;

    this.setState((state: State, props: Props) => ({
      user: {
        ...state.user,
        [name]: value,
      },
    }));
  }

  _handleSave = (e) => {
    const { user } = this.state;

    // Basic client-side validation.
    const errors = UserForm.validate(user);

    if (!isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    this.props.updateUser(user);
  }
}

const mapStateToProps = ({ requests, session, users }) => ({
  requests,
  session,
  user: find(users, user => user.id === session.user.id),
});

const mapDispatchToProps = dispatch => ({
  fetchMember: userId => dispatch(fetchMember(userId)),
  updateUser: user => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsController);
