import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import summitSettings from '../summit-settings.json'; // Import the settings file
import { createFontImport } from '../utils/fontUtils'; // Helper function to dynamically import fonts
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { CONSTANTS } from '../services/config/app-config';
import { persistor, store } from '../store/store';
import useInitializeGoogleAnalytics from '../hooks/GoogleAnalytics/useInitializeGoogleAnalytics';
import ErrorBoundary from '../components/ErrorBoundary';
const Layout = dynamic(() => import('../components/Layout'));
const ProtectedRoute = dynamic(() => import('../routes/ProtectedRoute'));
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss';

// Dynamically import font based on settings
const fontFamily = summitSettings.data.font_family || 'Nunito'; // Default to Nunito
const dynamicFont = createFontImport(fontFamily); // Import font dynamically

// Specify Google Tracking Code for Google Analytics

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (CONSTANTS.ENABLE_GOOGLE_ANALYTICS) {
      useInitializeGoogleAnalytics();
    }
  }, []);
  return (
    <div className={dynamicFont.className}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <Layout>
              <ToastContainer
                position="top-right"
                className="toast-container-below-navbar"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                closeOnClick
                pauseOnHover
              />
              {/* Below condition is to check whether give complete access of site to guest user or user can access site only after authentication */}
              {CONSTANTS.ALLOW_GUEST_TO_ACCESS_SITE_EVEN_WITHOUT_AUTHENTICATION ? (
                <Component {...pageProps} />
              ) : (
                <ProtectedRoute>
                  <Component {...pageProps} />
                </ProtectedRoute>
              )}
            </Layout>
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
