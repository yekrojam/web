import PropTypes from 'prop-types';
import React from 'react';

const PageHeader = (props) => {
  return (
    <div className="app-page-header">
      <h1 className="app-page-header-title">
        {props.title}
      </h1>
      <div className="app-page-header-aux">
        {props.children}
      </div>
    </div>
  );
};

export default PageHeader;
