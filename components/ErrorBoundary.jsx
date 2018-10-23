import React from 'react';

class ErrorBoundary extends React.Component {
  componentDidCatch(error) {
    // TODO: Handle errors...
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
