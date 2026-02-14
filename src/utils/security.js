import DOMPurify from 'dompurify';

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

/**
 * Sanitize HTML content
 * @param {string} html - HTML content to sanitize
 * @returns {string} Sanitized HTML
 */
export const sanitizeHTML = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target'],
  });
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with strength and issues
 */
export const validatePasswordStrength = (password) => {
  const issues = [];
  let strength = 0;
  
  if (password.length < 8) {
    issues.push('Password must be at least 8 characters');
  } else {
    strength += 1;
  }
  
  if (!/[a-z]/.test(password)) {
    issues.push('Must contain lowercase letter');
  } else {
    strength += 1;
  }
  
  if (!/[A-Z]/.test(password)) {
    issues.push('Must contain uppercase letter');
  } else {
    strength += 1;
  }
  
  if (!/[0-9]/.test(password)) {
    issues.push('Must contain number');
  } else {
    strength += 1;
  }
  
  if (!/[^A-Za-z0-9]/.test(password)) {
    issues.push('Must contain special character');
  } else {
    strength += 1;
  }
  
  return {
    isValid: issues.length === 0,
    strength: ['weak', 'fair', 'good', 'strong', 'very strong'][strength - 1] || 'weak',
    issues,
  };
};

/**
 * Encode data for URL
 * @param {string} data - Data to encode
 * @returns {string} Encoded data
 */
export const encodeForURL = (data) => {
  return encodeURIComponent(data);
};

/**
 * Generate CSRF token (for demonstration - should be handled by backend)
 * @returns {string} Random token
 */
export const generateCSRFToken = () => {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
};

/**
 * Secure token storage helpers
 */
export const tokenStorage = {
  set: (key, value) => {
    // In production, consider using httpOnly cookies for tokens
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  },
  
  get: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};