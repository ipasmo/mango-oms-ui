import axiosInstance from './axiosInstance';
import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '@utils/constants';

/**
 * Login user
 */
export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  
  const { token, refreshToken, user } = response.data;
  
  // Store tokens and user data
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  
  return response.data;
};

/**
 * Register new user
 */
export const signup = async (userData) => {
  const response = await axiosInstance.post('/auth/signup', userData);
  
  const { token, refreshToken, user } = response.data;
  
  // Store tokens and user data
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  
  return response.data;
};

/**
 * Logout user
 */
export const logout = async () => {
  try {
    await axiosInstance.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear all stored data
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

/**
 * Get current user profile
 */
export const getProfile = async () => {
  const response = await axiosInstance.get('/auth/profile');
  return response.data;
};

/**
 * Update user profile
 */
export const updateProfile = async (profileData) => {
  const response = await axiosInstance.put('/auth/profile', profileData);
  
  // Update stored user data
  localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
  
  return response.data;
};

/**
 * Change password
 */
export const changePassword = async (passwordData) => {
  const response = await axiosInstance.post('/auth/change-password', passwordData);
  return response.data;
};

/**
 * Request password reset
 */
export const requestPasswordReset = async (email) => {
  const response = await axiosInstance.post('/auth/forgot-password', { email });
  return response.data;
};

/**
 * Reset password with token
 */
export const resetPassword = async (token, newPassword) => {
  const response = await axiosInstance.post('/auth/reset-password', {
    token,
    newPassword,
  });
  return response.data;
};

/**
 * Verify email
 */
export const verifyEmail = async (token) => {
  const response = await axiosInstance.post('/auth/verify-email', { token });
  return response.data;
};

/**
 * Refresh authentication token
 */
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  
  const response = await axiosInstance.post('/auth/refresh', { refreshToken });
  
  const { token } = response.data;
  localStorage.setItem(TOKEN_KEY, token);
  
  return response.data;
};
