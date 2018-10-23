// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import getRoutes from '../routes';

const App = ({ user }) => {
  const routes = getRoutes(user);

  return (
    <Switch>
      {routes.map(route => <Route key={route.path} {...route} />)}
    </Switch>
  );
};

const mapStateToProps = ({ router: { location }, session: { user } }) => ({
  // IMPORTANT: The use of `connect` blocks route transitions unless the
  // location is also passed down.
  // See: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md#recommended-solution
  location,
  user,
});

export default connect(mapStateToProps)(App);
