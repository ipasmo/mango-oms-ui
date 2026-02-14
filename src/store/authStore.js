import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@api/authApi';
import { toast } from 'react-toastify';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      // Login action
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const { user, accessToken } = await authApi.login(credentials);
          set({ user, isAuthenticated: true, isLoading: false });
          toast.success(`Welcome back, ${user.name}!`);
          return user;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      // Register action
      register: async (userData) => {
        set({ isLoading: true });
        try {
          const data = await authApi.register(userData);
          toast.success('Registration successful! Please login.');
          set({ isLoading: false });
          return data;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      // Logout action
      logout: async () => {
        try {
          await authApi.logout();
        } finally {
          set({ user: null, isAuthenticated: false });
          toast.info('Logged out successfully');
        }
      },
      
      // Load user
      loadUser: async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }
        
        try {
          const user = await authApi.getCurrentUser();
          set({ user, isAuthenticated: true });
        } catch (error) {
          set({ user: null, isAuthenticated: false });
          localStorage.removeItem('accessToken');
        }
      },
      
      // Update profile
      updateProfile: async (userData) => {
        try {
          const updatedUser = await authApi.updateProfile(userData);
          set({ user: updatedUser });
          toast.success('Profile updated successfully');
          return updatedUser;
        } catch (error) {
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;