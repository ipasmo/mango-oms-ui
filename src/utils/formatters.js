/**
 * Format currency values
 */
export const formatCurrency = (amount, currency = 'USD') => {
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    INR: '₹',
  };
  
  const symbol = currencySymbols[currency] || '$';
  return `${symbol}${Number(amount).toFixed(2)}`;
};

/**
 * Format date
 */
export const formatDate = (date, format = 'long') => {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  const options = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    },
  };
  
  return new Intl.DateTimeFormat('en-US', options[format] || options.long).format(dateObj);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  
  return formatDate(date, 'short');
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};

/**
 * Format weight
 */
export const formatWeight = (weight, unit = 'kg') => {
  return `${weight}${unit}`;
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 0) => {
  return `${Number(value).toFixed(decimals)}%`;
};

/**
 * Format number with commas
 */
export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Format order status for display
 */
export const formatOrderStatus = (status) => {
  const statusMap = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };
  
  return statusMap[status] || capitalize(status);
};

/**
 * Format card number (mask)
 */
export const formatCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (cleaned.length < 4) return cardNumber;
  return `**** **** **** ${cleaned.slice(-4)}`;
};

/**
 * Parse currency string to number
 */
export const parseCurrency = (currencyString) => {
  return parseFloat(currencyString.replace(/[^0-9.-]+/g, '')) || 0;
};

/**
 * Format address for display
 */
export const formatAddress = (address) => {
  if (!address) return '';
  
  const { street, city, state, zipCode, country } = address;
  return `${street}, ${city}, ${state} ${zipCode}, ${country}`;
};
