// @flow

import React from 'react';
import { connect } from 'react-redux';

import './styles/Footer.scss';

const Footer = ({ org }) => (
  <div className="app-footer">
    <div className="container">
      © {(new Date()).getFullYear()} {org.name}
    </div>
  </div>
);

const mapStateToProps = ({ org }) => ({ org });

export default connect(mapStateToProps)(Footer);
