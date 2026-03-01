import axiosInstance from './axiosInstance';
import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '@utils/constants';

/**
 * Login user
 */
export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  const data = response.data || response; // Handle both wrapped and unwrapped responses
  
  const { token, refreshToken, user } = data;
  
  // Store tokens and user data
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  
  return data;
};

/**
 * Register new user
 */
export const signup = async (userData) => {
  const response = await axiosInstance.post('/auth/signup', userData);
  const data = response.data || response; // Handle both wrapped and unwrapped responses
  
  const { token, refreshToken, user } = data;
  
  // Store tokens and user data
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  
  return data;
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
  return await axiosInstance.get('/auth/profile');
};

/**
 * Update user profile
 */
export const updateProfile = async (profileData) => {
  const response = await axiosInstance.put('/auth/profile', profileData);
  const data = response.data || response; // Handle both wrapped and unwrapped responses
  
  // Update stored user data
  if (data.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }
  
  return data;
};

/**
 * Change password
 */
export const changePassword = async (passwordData) => {
  return await axiosInstance.post('/auth/change-password', passwordData);
};

/**
 * Request password reset
 */
export const requestPasswordReset = async (email) => {
  return await axiosInstance.post('/auth/forgot-password', { email });
};

/**
 * Reset password with token
 */
export const resetPassword = async (token, newPassword) => {
  return await axiosInstance.post('/auth/reset-password', {
    token,
    newPassword,
  });
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
