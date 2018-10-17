import { createMemoryHistory } from 'history';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import App from '../../components/App';

import createStore from '../../store';
import renderHtml from '../utils/renderHtml';

export default (req, res, next) => {
  try {
    const { authToken, org, user, url } = req;
    const history = createMemoryHistory({ initialEntries: [url] });

    const store = createStore(history, {
      org: org || {},
      session: {
        authToken: authToken || '',
        user: user || {},
      },
    });

    const dom = renderToString(
      <Provider store={store}>
        <StaticRouter context={{}} location={url}>
          <App />
        </StaticRouter>
      </Provider>,
    );

    res.send(renderHtml(dom, store.getState()));
  } catch (err) {
    next(err);
  }
};
