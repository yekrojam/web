// @flow

import cx from 'classnames';
import React from 'react';

import BasePage from './BasePage';
import Footer from './Footer';
import Header from './Header';

import './styles/Page.scss';

type Props = {
  children?: any,
  className?: string,
  title: string,
};

/**
 * Page
 */
const Page = (props: Props) => {
  const { children, className, title } = props;

  return (
    <BasePage className={cx('app-page', className)} title={title}>
      <Header />
      <div className="app-content container">
        {children}
      </div>
      <Footer />
    </BasePage>
  );
};

export default Page;
