import {isEmpty} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Col, Media, Panel, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import Page from '../../components/Page/Page';
import PageHeader from '../../components/Page/PageHeader';

import {fetchUsers} from '../../actions';
import ActionTypes from '../../constants/ActionTypes';

const MemberCard = ({user}) => {
  const name = `${user.name.first} ${user.name.last}`;
  const details = [
    {data: user.email, label: 'Email'},
    {data: user.phone, label: 'Phone'},
  ];

  return (
    <Panel className="user-card">
      <Panel.Body>
        <Media>
          <Media.Left>
            <img alt={name} src={user.picture.thumbnail} />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              <Link to={{pathname: `/users/${user.id}`}}>
                {name}
              </Link>
            </Media.Heading>
            <ul style={{listStyle: 'none', paddingLeft: '0'}}>
              {details.map(({data, label}) => (
                <li key={data}>
                  <strong>{label}:</strong> {data}
                </li>
              ))}
            </ul>
          </Media.Body>
        </Media>
      </Panel.Body>
    </Panel>
  );
};

/**
 * HomeController
 *
 * The logged-in homepage for the app.
 */
class HomeController extends React.Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    const title = 'Members';

    return (
      <Page className="directory" title={title}>
        <PageHeader title={title} />
        {this._renderContents()}
      </Page>
    );
  }

  _renderContents = () => {
    const {pendingRequests, users} = this.props;

    if (isEmpty(users) || pendingRequests[ActionTypes.USERS_FETCH]) {
      return <Loader />;
    }

    return (
      <Row>
        {users.map((user) => (
          <Col key={user.id} lg={4} sm={6} xs={12}>
            <MemberCard user={user} />
          </Col>
        ))}
      </Row>
    );
  }
}

HomeController.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = ({pendingRequests, users}) => ({
  pendingRequests,
  users,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeController);
