import PropTypes from 'prop-types';
import React from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';

import {APP_NAME, AUTH_PATH, HOME_PATH} from '../../constants/app';

import './styles/AccountNavItem.scss';

const AccountNavItem = ({user}) => {
  const items = [
    {label: 'My profile', pathname: `/users/${user.id}`},
    {label: 'My settings', pathname: '/settings'},
  ];

  return (
    <NavDropdown
      className="account-nav-item"
      id="account-menu"
      title={
        <div
          className="account-nav-item-photo"
          style={{
            backgroundImage: `url(${user.picture.thumbnail})`,
          }}
        />
      }>
      <li className="arrow" />
      {items.map(({label, pathname}, idx) => (
        <LinkContainer isActive={() => false} key={pathname} to={{pathname}}>
          <MenuItem>{label}</MenuItem>
        </LinkContainer>
      ))}
      <MenuItem divider />
      <MenuItem href="/logout">
        Sign Out
      </MenuItem>
    </NavDropdown>
  );
};

AccountNavItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    picture: PropTypes.object.isRequired,
  }).isRequired,
};

export default AccountNavItem;
