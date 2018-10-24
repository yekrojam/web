import React from 'react';
import { Col, Nav, NavItem, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router-dom';

import OrgAdmin from '../../components/Admin/OrgAdmin';
import Page from '../../components/Page/Page';
import MembersAdmin from '../../components/Admin/MembersAdmin';

import './styles/AdminController.scss';

/**
 * AdminController
 *
 * Admin dashboard for adding, editing, and removing users and permissions.
 */
const AdminController = (props) => {
  const { path, url } = props.match;
  const routes = [
    {
      path,
      component: OrgAdmin,
      exact: true,
      item: {
        label: 'Org',
        isActive: (match, location) => match.url === location.pathname,
        pathname: url,
      },
    },
    {
      path: `${path}/members`,
      component: MembersAdmin,
      item: {
        label: 'Members',
        pathname: `${url}/members`,
      },
    },
  ];

  return (
    <Page className="admin" title="Admin">
      <Row>
        <Col md={2}>
          <Nav bsStyle="pills" stacked>
            {routes.map(({ item: { isActive, label, pathname } }) => (
              <LinkContainer
                isActive={isActive}
                key={pathname}
                to={{ pathname }}>
                <NavItem>{label}</NavItem>
              </LinkContainer>
            ))}
          </Nav>
        </Col>
        <Col md={10}>
          {routes.map(({ item, ...route }) => (
            <Route key={route.path} {...route} />
          ))}
        </Col>
      </Row>
    </Page>
  );
};

export default AdminController;
