import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import Page from '../../components/Page/Page';
import {HOME_PATH} from '../../constants/app';

/**
 * NotFoundController
 *
 * Catch-all page if a route doesn't match.
 */
const NotFoundController = ({history}) => {
  return (
    <Page className="not-found" title="Page Not Found">
      <h1>Page not found.</h1>
      <p>
        The link you followed may be broken or the page may have been removed.
      </p>
      <ul className="list-inline">
        <li>
          <a href="#" onClick={history.goBack}>
            Back
          </a>
        </li>
        <li>
          <Link to={{pathname: HOME_PATH}}>
            Home
          </Link>
        </li>
      </ul>
    </Page>
  );
};

export default withRouter(NotFoundController);
