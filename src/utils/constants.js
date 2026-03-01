/**
 * Application Constants
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
export const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000;

// Authentication
export const TOKEN_KEY = 'mango_auth_token';
export const REFRESH_TOKEN_KEY = 'mango_refresh_token';
export const USER_KEY = 'mango_user_data';

// Cart
export const CART_KEY = 'mango_cart';
export const MAX_CART_ITEMS = 50;

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const PAGE_SIZE_OPTIONS = [12, 24, 48];

// Product Lot Sizes
export const LOT_SIZES = {
  SMALL: { value: 3, label: '3kg', price: 15 },
  MEDIUM: { value: 5, label: '5kg', price: 24 },
  LARGE: { value: 10, label: '10kg', price: 45 },
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: 'card',
  PAYPAL: 'paypal',
  COD: 'cod',
};

// Supported Languages
export const LANGUAGES = {
  EN: { code: 'en', name: 'English', flag: '🇺🇸' },
  ES: { code: 'es', name: 'Español', flag: '🇪🇸' },
  HI: { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
};

// Supported Currencies
export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_CONFIRMATION: '/order-confirmation/:orderId',
  DASHBOARD: '/dashboard',
  ORDER_HISTORY: '/orders',
  PROFILE: '/profile',
  ADMIN_DASHBOARD: '/admin',
  NOT_FOUND: '*',
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  ORDER_PLACED: 'Order placed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  ITEM_ADDED: 'Item added to cart!',
};
