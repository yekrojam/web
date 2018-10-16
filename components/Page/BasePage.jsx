import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

/**
 * BasePage
 *
 * Base component for rendering a page, including code that should execute on
 * every page.
 */
class BasePage extends React.Component {
  componentDidMount() {
    // Set the browser page title.
    this._setTitle();
  }

  componentDidUpdate(prevProps) {
    // Update the browser page title on transitions.
    if (this.props.title !== prevProps.title) {
      this._setTitle();
    }
  }

  render() {
    return (
      <div className={cx('app', this.props.className)}>
        {this.props.children}
      </div>
    );
  }

  _setTitle = () => {
    const { org, title } = this.props;
    document.title = title ? `${org.name} \u00b7 ${title}` : org.name;
  }
}

BasePage.propTypes = {
  title: PropTypes.string.isRequired,
};

const mapStateToProps = ({ org }) => ({
  org,
});

export default connect(mapStateToProps)(BasePage);
