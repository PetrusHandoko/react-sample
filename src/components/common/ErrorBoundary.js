import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/ErrorBoundary.css';

/**
 * Error Boundary component to catch and handle React errors
 * 
 * @component
 * @example
 * return (
 *   <ErrorBoundary fallback={<div>Something went wrong</div>}>
 *     <MyComponent />
 *   </ErrorBoundary>
 * )
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return fallback || (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error Details</summary>
            <pre>{error?.message}</pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            className="error-reset-button"
          >
            Try Again
          </button>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  /** Content to render when there's no error */
  children: PropTypes.node.isRequired,
  /** Custom fallback UI to show when an error occurs */
  fallback: PropTypes.node
};

export default ErrorBoundary;