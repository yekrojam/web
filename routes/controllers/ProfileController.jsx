// @flow

import { find, isEmpty } from 'lodash';
import moment from 'moment';
import React from 'react';
import { Media } from 'react-bootstrap';
import { connect } from 'react-redux';

import Loader from '../../components/Loader/Loader';
import MemberImage from '../../components/User/MemberImage';
import Page from '../../components/Page/Page';

import { fetchMember } from '../../actions';
import { getUserName } from '../../utils/userUtils';

import ActionTypes from '../../constants/ActionTypes';
import { Id, User } from '../../constants/types';

type Props = {
  fetchMember: Function,
  match: { params: { userId: Id } },
  requests: Object,
  user: User,
};

/**
 * ProfileController
 *
 * A generic profile page for a user, depending on the URL's id param.
 */
class ProfileController extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchMember(this.props.match.params.userId);
  }

  componentWillReceiveProps({ match: { params } }) {
    // Re-fetch data when navigating to a different profile.
    if (this.props.match.params.userId !== params.userId) {
      this.props.fetchMember(params.userId);
    }
  }

  render() {
    return (
      <Page className="profile" title={getUserName(this.props.user)}>
        {this._renderContents()}
      </Page>
    );
  }

  _renderContents = () => {
    const { requests, user } = this.props;

    if (isEmpty(user) || requests[ActionTypes.MEMBER_FETCH]) {
      return <Loader />;
    }

    const {
      birthDate,
      birthMonth,
      birthYear,
      createdAt,
      email,
      gender,
      phone,
    } = user;
    const name = getUserName(user);

    const details = [
      { data: moment(createdAt).format('MMMM YYYY'), label: 'Joined' },
      { data: email, label: 'Email' },
    ];

    if (phone) {
      details.push({
        data: phone,
        label: 'Phone',
      });
    }

    if (gender) {
      details.push({
        data: gender,
        label: 'Gender',
      });
    }

    if (birthYear && birthMonth && birthDate) {
      const data = moment()
        .set({
          year: birthYear,
          month: birthMonth,
          date: birthDate,
        })
        .format('MMMM Do, YYYY');

      details.push({
        data,
        label: 'Birthday',
      });
    }

    return (
      <div>
        <Media>
          <Media.Left>
            <MemberImage size="large" user={user} />
          </Media.Left>
          <Media.Body>
            <h2>{name}</h2>
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
              {details.map(({ data, label }) => (
                <li key={data}>
                  <strong>{label}:</strong> {data}
                </li>
              ))}
            </ul>
          </Media.Body>
        </Media>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { requests, users } = state;
  const { match: { params } } = props;

  return {
    requests,
    user: find(users, user => user.id === params.userId),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMember: userId => dispatch(fetchMember(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileController);
