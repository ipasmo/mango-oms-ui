import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '@store/authStore';
import Spinner from '@components/common/Spinner';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const location = useLocation();
  
  if (isLoading) {
    return <Spinner fullScreen />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if user has admin role
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default AdminRoute;