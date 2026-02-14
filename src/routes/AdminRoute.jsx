import { Navigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import Spinner from '@components/common/Spinner';

/**
 * Admin Route Component
 * Redirects to home if user is not an admin
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner fullScreen text="Loading..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
