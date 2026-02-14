import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import Button from './Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Log to error tracking service (e.g., Sentry)
    if (import.meta.env.PROD) {
      // window.Sentry?.captureException(error);
    }
  }
  
  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <IoWarningOutline className="w-20 h-20 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-8">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            
            {import.meta.env.DEV && this.state.error && (
              <details className="text-left bg-red-50 p-4 rounded-lg mb-8">
                <summary className="cursor-pointer font-medium text-red-900 mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs text-red-800 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            
            <div className="flex gap-4 justify-center">
              <Button onClick={this.handleReset}>
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default ErrorBoundary;