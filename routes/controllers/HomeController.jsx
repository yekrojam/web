import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Col, FormControl, Label, Media, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import MemberImage from '../../components/User/MemberImage';
import Page from '../../components/Page/Page';
import PageHeader from '../../components/Page/PageHeader';

import { fetchUsers } from '../../actions';
import ActionTypes from '../../constants/ActionTypes';
import { UserType } from '../../constants/propTypes';
import { getUserName } from '../../utils/userUtils';

const MemberCard = ({ user }) => {
  const isAdmin = user.roles.indexOf('ADMIN') > -1;
  const name = getUserName(user);

  const details = [
    { data: user.email, label: 'Email' },
    { data: user.phone, label: 'Phone' },
  ];

  return (
    <Panel className="user-card">
      <Panel.Body>
        <Media>
          <Media.Left>
            <MemberImage user={user} />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              <Link to={{ pathname: `/users/${user.id}` }}>
                {name}
              </Link>
              {' '}
              {isAdmin && <Label>Admin</Label>}
            </Media.Heading>
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
              {details.map(({ data, label }) => (
                data ?
                  <li key={data}>
                    <strong> {label}:</strong> {data}
                  </li> :
                  null
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
  state = { filter: '' }

  componentDidMount() {
    this.props.fetchUsers();
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

    if (isEmpty(users) || requests[ActionTypes.USERS_FETCH]) {
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

HomeController.propTypes = {
  users: PropTypes.arrayOf(UserType),
};

const mapStateToProps = ({ requests, users }) => ({
  requests,
  users,
});

const mapDispatchToProps = dispatch => ({ fetchUsers: () => dispatch(fetchUsers()) });

export default connect(mapStateToProps, mapDispatchToProps)(HomeController);
