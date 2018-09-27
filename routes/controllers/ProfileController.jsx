import { find, isEmpty } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Media } from 'react-bootstrap';
import { connect } from 'react-redux';

import Loader from '../../components/Loader/Loader';
import Page from '../../components/Page/Page';
import { fetchUser } from '../../actions';

import ActionTypes from '../../constants/ActionTypes';
import getUserName from '../../utils/getUserName';

/**
 * ProfileController
 *
 * A generic profile page for a user, depending on the URL's id param.
 */
class ProfileController extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  componentWillReceiveProps({ match: { params } }) {
    // Re-fetch data when navigating to a different profile.
    if (this.props.match.params.userId !== params.userId) {
      this.props.fetchUser(params.userId);
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
    const { pendingRequests, user } = this.props;

    if (isEmpty(user) || pendingRequests[ActionTypes.USERS_FETCH]) {
      return <Loader />;
    }

    const { birthDate, birthMonth, birthYear, createdAt, email, phone } = user;
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

    if (birthYear && birthMonth && birthDate) {
      const data = moment()
        .set({
          year: birthYear,
          month: birthMonth,
          day: birthDate,
        })
        .format('MMMM, Do YYYY');

      details.push({
        data,
        label: 'Birthday',
      });
    }

    return (
      <div>
        <Media>
          <Media.Left>
            <img alt={name} src={user.imageURL} height={150} width={150} />
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

ProfileController.propTypes = {
  user: PropTypes.object, /* eslint-disable-line react/forbid-prop-types */
};

const mapStateToProps = (state, props) => {
  const { pendingRequests, users } = state;
  const { match: { params } } = props;

  return {
    pendingRequests,
    user: find(users, user => user.id === params.userId),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileController);
