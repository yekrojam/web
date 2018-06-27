import cx from 'classnames';
import React from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';

import BasePage from './BasePage';
import {APP_NAME, AUTH_PATH, HOME_PATH} from '../../constants/app';
import './styles/Page.scss';

/**
 * Page
 */
class Page extends React.Component {
  render() {
    const {children, className, session: {user}, title} = this.props;
    const isLoggedIn = !!(user && user.id);

    let navItems;
    if (isLoggedIn) {
      navItems = [
        {label: 'Home', pathname: HOME_PATH},
        {label: 'Profile', pathname: `/users/${user.id}`},
      ].map(({label, pathname}) => (
        <LinkContainer key={pathname} to={{pathname}}>
          <NavItem>{label}</NavItem>
        </LinkContainer>
      ));
    }

    return (
      <BasePage className={cx('app-page', className)} title={title}>
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
              <NavItem href={isLoggedIn ? '/logout' : AUTH_PATH}>
                Log {isLoggedIn ? 'Out' : 'In'}
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          {children}
        </div>
        <div className="app-footer">
          <div className="container">
            © {APP_NAME} {(new Date()).getFullYear()}
          </div>
        </div>
      </BasePage>
    );
  }
}

const mapStateToProps = ({session}) => ({
  session,
});

export default connect(mapStateToProps)(Page);
