import React from 'react';
import {Button} from 'react-bootstrap';

import BasePage from '../../components/Page/BasePage';
import {APP_NAME} from '../../constants/app';

/**
 * IndexController
 *
 * The logged-out home page of the app.
 */
class IndexController extends React.Component {
  render() {
    return (
      <BasePage className="index" title="Welcome">
        <div className="jumbotron">
          <div className="container">
            <h1>{APP_NAME}</h1>
            <p className="lead">
              Connect yo'self.
            </p>
            <Button bsSize="large" bsStyle="primary" href="/auth">
              Log In
            </Button>
          </div>
        </div>
      </BasePage>
    );
  }
}

export default IndexController;
