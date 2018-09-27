import cx from 'classnames';
import React from 'react';

import BasePage from './BasePage';
import Header from './Header';

import { APP_NAME } from '../../constants/app';
import './styles/Page.scss';

/**
 * Page
 */
const Page = ({ children, className, title }) => (
  <BasePage className={cx('app-page', className)} title={title}>
    <Header />
    <div className="app-content container">
      {children}
    </div>
    <div className="app-footer">
      <div className="container">
        © {APP_NAME} {(new Date()).getFullYear()}
      </div>
    </div>
  </BasePage>
);

export default Page;
