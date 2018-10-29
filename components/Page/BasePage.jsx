// @flow

import cx from 'classnames';
import React from 'react';
import { connect } from 'react-redux';

import AppAlert from '../AppAlert/AppAlert';
import { clearErrors } from '../../utils/actionTypes';

import { Org } from '../../constants/types';

type ReduxProps = {
  clearErrors: Function,
  errors: Object,
  org: Org,
};

type Props = ReduxProps & {
  children: any,
  className?: string,
  title: string,
};

/**
 * BasePage
 *
 * Base component for rendering a page, including code that should execute on
 * every page.
 */
class BasePage extends React.Component<Props> {
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
    const { children, className, errors } = this.props;
    const messages = Object.keys(errors).map(e => errors[e].message);

    return (
      <div className={cx('app', className)}>
        {children}
        <AppAlert
          bsStyle="danger"
          onHide={this.props.clearErrors}
          show={!!messages.length}>
          {messages}
        </AppAlert>
      </div>
    );
  }

  _setTitle = () => {
    const { org, title } = this.props;
    document.title = title ? `${org.name} \u00b7 ${title}` : org.name;
  }
}

const mapStateToProps = ({ errors, org }) => ({
  errors,
  org,
});

const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasePage);
