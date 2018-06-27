import React from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';

import AccountNavItem from './AccountNavItem';

import {APP_NAME, AUTH_PATH, HOME_PATH} from '../../constants/app';

/**
 * Header
 */
class Header extends React.Component {
  render() {
    const {session: {user}} = this.props;

    const navItems = !!(user && user.id) ?
      <AccountNavItem user={user} /> :
      <NavItem href={AUTH_PATH}>
        Sign In
      </NavItem>;

    return (
      <Navbar className="app-header" fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={{pathname: HOME_PATH}}>
              {APP_NAME}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {navItems}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = ({session}) => ({
  session,
});

export default connect(mapStateToProps)(Header);
