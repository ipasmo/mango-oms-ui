import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import ErrorBoundary from '@components/common/ErrorBoundary';
import CartDrawer from '@components/cart/CartDrawer';
import AppRoutes from '@routes/AppRoutes';
import i18n from '@utils/i18n';
import '@assets/styles/global.css';

/**
 * Main App Component
 * Root component with providers and routing
 */
function App() {
  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <AppRoutes />
          <CartDrawer />
        </BrowserRouter>
      </I18nextProvider>
    </ErrorBoundary>
  );
}

export default App;
