import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, TOKEN_KEY, REFRESH_TOKEN_KEY } from '@utils/constants';
import { getCsrfToken } from '@utils/security';

/**
 * Axios instance with default configuration
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * Adds authentication token and CSRF token to requests
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add CSRF token for non-GET requests
    if (config.method !== 'get') {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handles token refresh and global error handling
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized - attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });
          
          const { token } = response.data;
          localStorage.setItem(TOKEN_KEY, token);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle network errors
    if (!error.response) {
      error.message = 'Network error. Please check your internet connection.';
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      error.message = 'You do not have permission to access this resource.';
    }
    
    // Handle 404 Not Found
    if (error.response?.status === 404) {
      error.message = 'The requested resource was not found.';
    }
    
    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      error.message = 'Server error. Please try again later.';
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
