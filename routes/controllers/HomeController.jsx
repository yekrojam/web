// @flow

import { isEmpty } from 'lodash';
import React from 'react';
import { Col, FormControl, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import Loader from '../../components/Loader/Loader';
import MemberCard from '../../components/User/MemberCard';
import Page from '../../components/Page/Page';
import PageHeader from '../../components/Page/PageHeader';

import { fetchMembers } from '../../actions';
import { getUserName } from '../../utils/userUtils';

import ActionTypes from '../../constants/ActionTypes';
import { User } from '../../constants/types';

type Props = {
  fetchMembers: Function,
  requests: Object,
  users: Array<User>,
};

type State = {
  filter: string,
};

/**
 * HomeController
 *
 * The logged-in homepage for the app.
 */
class HomeController extends React.Component<Props, State> {
  state = {
    filter: '',
  };

  componentDidMount() {
    this.props.fetchMembers();
  }

  render() {
    const title = 'Members';

    return (
      <Page className="directory" title={title}>
        <PageHeader title={title}>
          <FormControl
            onChange={this._handleFilter}
            placeholder="Search..."
          />
        </PageHeader>
        {this._renderContents()}
      </Page>
    );
  }

  _renderContents = () => {
    const { requests, users } = this.props;
    const filter = this.state.filter.toLowerCase();

    if (isEmpty(users) || requests[ActionTypes.MEMBERS_FETCH]) {
      return <Loader />;
    }

    return (
      <Row>
        {users
          .filter(user => (
            getUserName(user).toLowerCase().indexOf(filter) !== -1 ||
            user.email.toLowerCase().indexOf(filter) !== -1
          ))
          .map(user => (
            <Col key={user.id} lg={4} sm={6} xs={12}>
              <MemberCard user={user} />
            </Col>
          ))
        }
      </Row>
    );
  }

  _handleFilter = (e) => {
    this.setState({ filter: e.target.value });
  }
}

const mapStateToProps = ({ requests, users }) => ({
  requests,
  users,
});

const mapDispatchToProps = dispatch => ({
  fetchMembers: () => dispatch(fetchMembers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeController);
