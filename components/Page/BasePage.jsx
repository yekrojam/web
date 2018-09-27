import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { APP_NAME } from '../../constants/app';

const setTitle = (title) => {
  document.title = title ? `${APP_NAME} \u00b7 ${title}` : APP_NAME;
};

/**
 * BasePage
 *
 * Base component for rendering a page, including code that should execute on
 * every page.
 */
class BasePage extends React.Component {
  componentDidMount() {
    // Set the browser page title.
    setTitle(this.props.title);
  }

  componentDidUpdate(prevProps) {
    // Update the browser page title on transitions.
    if (this.props.title !== prevProps.title) {
      setTitle(this.props.title);
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

BasePage.propTypes = { title: PropTypes.string.isRequired };

export default BasePage;
