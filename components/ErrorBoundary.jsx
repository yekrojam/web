// @flow

import React from 'react';

type Props = {
  children: any,
};

class ErrorBoundary extends React.Component<Props> {
  componentDidCatch(error: Error) {
    // TODO: Handle errors...
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
