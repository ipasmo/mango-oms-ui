import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@store/authStore';

/**
 * Custom hook for authentication
 * Provides auth state and actions with convenience methods
 */
const useAuth = () => {
  const navigate = useNavigate();
  
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    initialize,
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
    clearError,
    isAdmin,
  } = useAuthStore();

  // Initialize auth from localStorage on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Login with redirect
  const loginAndRedirect = async (credentials, redirectTo = '/dashboard') => {
    try {
      await login(credentials);
      navigate(redirectTo);
    } catch (error) {
      throw error;
    }
  };

  // Signup with redirect
  const signupAndRedirect = async (userData, redirectTo = '/dashboard') => {
    try {
      await signup(userData);
      navigate(redirectTo);
    } catch (error) {
      throw error;
    }
  };

  // Logout with redirect
  const logoutAndRedirect = async (redirectTo = '/') => {
    try {
      await logout();
      navigate(redirectTo);
    } catch (error) {
      throw error;
    }
  };

  // Require authentication (redirect if not authenticated)
  const requireAuth = (redirectTo = '/login') => {
    if (!isAuthenticated) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  // Require admin role (redirect if not admin)
  const requireAdmin = (redirectTo = '/') => {
    if (!isAuthenticated || !isAdmin()) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    isAdmin: isAdmin(),
    
    // Actions
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
    clearError,
    
    // Convenience methods
    loginAndRedirect,
    signupAndRedirect,
    logoutAndRedirect,
    requireAuth,
    requireAdmin,
  };
};

export default useAuth;
