import {find, isEmpty} from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {Media} from 'react-bootstrap';
import {connect} from 'react-redux';

import Loader from '../../components/Loader/Loader';
import Page from '../../components/Page/Page';
import {fetchUser} from '../../actions';

import ActionTypes from '../../constants/ActionTypes';

function getUserName(user) {
  if (!user) {
    return '';
  }

  return `${user.name.first} ${user.name.last}`;
}

/**
 * ProfileController
 *
 * A generic profile page for a user, depending on the URL's id param.
 */
class ProfileController extends React.Component {
  componentWillMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  componentWillReceiveProps({match: {params}}) {
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
    const {pendingRequests, user} = this.props;

    if (isEmpty(user) || pendingRequests[ActionTypes.USERS_FETCH]) {
      return <Loader />;
    }

    const joined = moment(user.registered.date).format('MMMM YYYY');
    const location = `${user.location.city}, ${user.location.state}`;
    const name = getUserName(user);

    const details = [
      {data: joined, label: 'Joined'},
      {data: location, label: 'Location'},
      {data: user.email, label: 'Email'},
      {data: user.phone, label: 'Phone'},
      {data: moment(user.dob.date).format('MMMM, Do YYYY'), label: 'Birthday'},
    ];

    return (
      <div>
        <Media>
          <Media.Left>
            <img alt={name} src={user.picture.large} />
          </Media.Left>
          <Media.Body>
            <h2>{name}</h2>
            <ul style={{listStyle: 'none', paddingLeft: '0'}}>
              {details.map(({data, label}) => (
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
  user: PropTypes.object,
};

const mapStateToProps = ({pendingRequests, users}, {match: {params}}) => ({
  pendingRequests,
  user: find(users, (user) => user.id === params.userId),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileController);
