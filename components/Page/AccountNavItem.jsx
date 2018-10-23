import React, { Fragment } from 'react';
import { MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import isAdmin from '../../utils/isAdmin';
import { UserType } from '../../constants/propTypes';

import './styles/AccountNavItem.scss';

const AppMenuItem = ({ children, to }) => (
  <LinkContainer isActive={() => false} to={to}>
    <MenuItem>{children}</MenuItem>
  </LinkContainer>
);

const AccountNavItem = ({ user }) => {
  const items = [
    { label: 'My profile', pathname: `/users/${user.id}` },
    { label: 'My settings', pathname: '/settings' },
  ];

  const adminMenuItem = isAdmin(user) ?
    <Fragment>
      <AppMenuItem to={{ pathname: '/admin' }}>
        Admin
      </AppMenuItem>
      <MenuItem divider />
    </Fragment> :
    null;

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
        <AppMenuItem key={pathname} to={{ pathname }}>
          {label}
        </AppMenuItem>
      ))}
      <MenuItem divider />
      {adminMenuItem}
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
