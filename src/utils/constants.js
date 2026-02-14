export const MANGO_VARIETIES = [
  'Alphonso',
  'Kesar',
  'Dasheri',
  'Langra',
  'Totapuri',
  'Badami',
  'Chausa',
  'Himsagar',
];

export const LOT_SIZES = ['3kg', '5kg', '10kg'];

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  UPI: 'upi',
  NET_BANKING: 'net_banking',
  COD: 'cod',
};

export const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar' },
  SGD: { symbol: 'S$', name: 'Singapore Dollar' },
  INR: { symbol: '₹', name: 'Indian Rupee' },
};

export const API_ENDPOINTS = {
  AUTH: '/auth',
  PRODUCTS: '/products',
  ORDERS: '/orders',
  USERS: '/users',
  ADMIN: '/admin',
};

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\d\s\-\+\(\)]+$/,
  POSTAL_CODE: /^\d{5,6}$/,
};