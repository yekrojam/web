import cx from 'classnames';
import React from 'react';

import BasePage from './BasePage';
import Footer from './Footer';
import Header from './Header';

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
    <Footer />
  </BasePage>
);

export default Page;
