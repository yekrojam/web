import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import BasePage from '../../components/Page/BasePage';

/**
 * IndexController
 *
 * The logged-out home page of the app.
 */
const IndexController = ({ org }) => (
  <BasePage className="index" title="Welcome">
    <div className="jumbotron">
      <div className="container">
        <h1>{org.name}</h1>
        <p className="lead">
          {org.description}
        </p>
        <Button bsSize="large" bsStyle="primary" href="/auth">
          Log In
        </Button>
      </div>
    </div>
  </BasePage>
);

const mapStateToProps = ({ org }) => ({ org });

export default connect(mapStateToProps)(IndexController);
