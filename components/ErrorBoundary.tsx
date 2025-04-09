import { Component, ErrorInfo, ReactNode } from 'react';
import Image from 'next/image';
import image from '../public/assets/images/Error.svg';
import ErrorBoundaryStyles from '../styles/components/errorboundary.module.scss';
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={` ${ErrorBoundaryStyles.error_main_container} ${ErrorBoundaryStyles.error_page}`}>
          <div className={`${ErrorBoundaryStyles.error_content}  d-flex justify-content-center align-items-center`}>
            <div className="" style={{ fontSize: '40px' }}>
              <Image src={image} width={107} height={96} alt="Error Image" />
            </div>
            <h4 className="mb-2 mt-4 d-flex justify-content-center text-center">Oops, Something Went Wrong!</h4>
            <p className="grey text-center">
              {/* Sorry, Our engineers are currently fixing something. */}
              We're sorry to encounter an unexpected error, please try again.
            </p>

            <button className={`${ErrorBoundaryStyles.error_button} mt-4`} onClick={() => location.reload()}>
              <div className={`${ErrorBoundaryStyles.error_button_text} font-poppins`}>Refresh Page</div>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
