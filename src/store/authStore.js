import { create } from 'zustand';
import { TOKEN_KEY, USER_KEY } from '@utils/constants';
import * as authApi from '@api/authApi';

/**
 * Authentication Store
 * Manages user authentication state and actions
 */
const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Initialize from localStorage
  initialize: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({
          user,
          token,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Failed to parse user data:', error);
        get().logout();
      }
    }
  },

  // Login action
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await authApi.login(credentials);
      
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
      
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Signup action
  signup: async (userData) => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await authApi.signup(userData);
      
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
      
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Logout action
  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      });
    }
  },

  // Update profile action
  updateProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await authApi.updateProfile(profileData);
      
      set({
        user: data.user,
        isLoading: false,
      });
      
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Change password action
  changePassword: async (passwordData) => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await authApi.changePassword(passwordData);
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
  
  // Check if user is admin
  isAdmin: () => {
    const { user } = get();
    return user?.role === 'admin';
  },
}));

export default useAuthStore;
