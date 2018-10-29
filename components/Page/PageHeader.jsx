// @flow

import React from 'react';

type Props = {
  children?: any,
  title: string,
};

const PageHeader = (props: Props) => (
  <div className="app-page-header">
    <h1 className="app-page-header-title">
      {props.title}
    </h1>
    <div className="app-page-header-aux">
      {props.children}
    </div>
  </div>
);

export default PageHeader;
