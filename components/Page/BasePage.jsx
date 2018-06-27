import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import {APP_NAME} from '../../constants/app';
import isBrowser from '../../utils/isBrowser';

const setTitle = (title) => {
  if (!isBrowser()) {
    return;
  }

  const prefix = APP_NAME;
  document.title = title ? `${prefix} \u00b7 ${title}` : prefix;
};

/**
 * BasePage
 *
 * Base component for rendering a page, including code that should execute on
 * every page.
 */
class BasePage extends React.Component {
  componentWillMount() {
    // Set the browser page title.
    setTitle(this.props.title);
  }

  componentWillReceiveProps(nextProps) {
    // Update the browser page title on transitions.
    if (this.props.title !== nextProps.title) {
      setTitle(nextProps.title);
    }
  }

  render() {
    return (
      <div className={cx('app', this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}

BasePage.propTypes = {
  title: PropTypes.string,
};

export default BasePage;
