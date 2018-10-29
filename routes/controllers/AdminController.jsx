// @flow

import React from 'react';
import { Col, Nav, NavItem, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router-dom';

import OrgAdmin from '../../components/Admin/OrgAdmin';
import Page from '../../components/Page/Page';
import MembersAdmin from '../../components/Admin/MembersAdmin';

import './styles/AdminController.scss';

type Props = {
  match: {
    path: string,
    url: string,
  },
};

const isActive = (match, location) => match && match.url === location.pathname;

/**
 * AdminController
 *
 * Admin dashboard for adding, editing, and removing users and permissions.
 */
const AdminController = (props: Props) => {
  const { path, url } = props.match;
  const routes = [
    {
      path,
      component: OrgAdmin,
      exact: true,
      item: {
        isActive,
        label: 'Org',
        pathname: url,
      },
    },
    {
      path: `${path}/members`,
      component: MembersAdmin,
      item: {
        isActive,
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
            {routes.map(({ item: { label, pathname, ...rest } }) => (
              <LinkContainer
                isActive={rest.isActive}
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
