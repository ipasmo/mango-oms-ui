import axiosInstance from './axiosInstance';
import { sanitizeInput } from '@utils/security';

export const authApi = {
  // Register new user
  register: async (userData) => {
    const sanitizedData = {
      email: sanitizeInput(userData.email),
      name: sanitizeInput(userData.name),
      password: userData.password, // Don't sanitize passwords
      phone: sanitizeInput(userData.phone),
    };
    
    const response = await axiosInstance.post('/auth/register', sanitizedData);
    return response.data;
  },
  
  // Login user
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', {
      email: sanitizeInput(credentials.email),
      password: credentials.password,
    });
    
    const { accessToken, refreshToken, user } = response.data;
    
    // Store tokens securely
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    return { user, accessToken };
  },
  
  // Logout user
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  
  // Get current user profile
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
  
  // Update profile
  updateProfile: async (userData) => {
    const response = await axiosInstance.put('/auth/profile', userData);
    return response.data;
  },
  
  // Request password reset
  requestPasswordReset: async (email) => {
    const response = await axiosInstance.post('/auth/forgot-password', {
      email: sanitizeInput(email),
    });
    return response.data;
  },
  
  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await axiosInstance.post('/auth/reset-password', {
      token,
      password: newPassword,
    });
    return response.data;
  },
};