// @flow

import cx from 'classnames';
import React from 'react';

import './Loader.scss';

type Props = {
  background?: bool,
  className?: string,
  full?: bool,
  size?: 'large' | 'small',
};

/**
 * Loader.react
 *
 * Displays a loading indicator.
 */
const Loader = (props: Props) => {
  const { background, size, full, className } = props;

  return (
    <div
      className={cx('loader', {
        'loader-bg': background,
        'loader-full': full,
      }, className)}>
      <i
        className={cx('loader-icon', { 'loader-icon-lg': size === 'large' })}
      />
    </div>
  );
};

Loader.defaultProps = {
  background: false,
  full: false,
  size: 'large',
};

export default Loader;
