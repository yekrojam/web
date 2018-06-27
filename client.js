/* eslint-disable react/jsx-filename-extension */

import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import createStore from './store';

const history = createBrowserHistory();

hydrate(
  <Provider store={createStore(history, window.APP_DATA)}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
