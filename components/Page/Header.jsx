import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AccountNavItem from './AccountNavItem';

import { AUTH_PATH, HOME_PATH } from '../../constants/app';

/**
 * Header
 */
const Header = (props) => {
  const { org, session: { user } } = props;

  const navItems = user && user.id ?
    <AccountNavItem user={user} /> :
    <NavItem href={AUTH_PATH}>
      Sign In
    </NavItem>;

  return (
    <Navbar className="app-header" fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={{ pathname: HOME_PATH }}>
            {org.name}
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
};

const mapStateToProps = ({ org, session }) => ({ org, session });

export default connect(mapStateToProps)(Header);
