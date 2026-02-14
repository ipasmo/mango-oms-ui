import { Suspense, lazy } from 'react';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/common/ErrorBoundary';
import Spinner from './components/common/Spinner';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner fullScreen />}>
        <AppRoutes />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;