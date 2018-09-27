import React from 'react';
import { MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { UserType } from '../../constants/propTypes';

import './styles/AccountNavItem.scss';

const AccountNavItem = ({ user }) => {
  const items = [
    { label: 'My profile', pathname: `/users/${user.id}` },
    { label: 'My settings', pathname: '/settings' },
  ];

  return (
    <NavDropdown
      className="account-nav-item"
      id="account-menu"
      title={
        <div
          className="account-nav-item-photo"
          style={{ backgroundImage: `url(${user.imageURL})` }}
        />
      }>
      <li className="arrow" />
      {items.map(({ label, pathname }) => (
        <LinkContainer isActive={() => false} key={pathname} to={{ pathname }}>
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
  user: UserType.isRequired,
};

export default AccountNavItem;
