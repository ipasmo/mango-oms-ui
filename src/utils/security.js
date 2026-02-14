import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target'],
  });
};

/**
 * Sanitize user input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * Requires: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
 */
export const isStrongPassword = (password) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};

/**
 * Encode data for safe URL usage
 */
export const encodeData = (data) => {
  return encodeURIComponent(JSON.stringify(data));
};

/**
 * Decode data from URL
 */
export const decodeData = (encodedData) => {
  try {
    return JSON.parse(decodeURIComponent(encodedData));
  } catch (error) {
    console.error('Failed to decode data:', error);
    return null;
  }
};

/**
 * Generate CSRF token
 */
export const generateCsrfToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Store CSRF token
 */
export const storeCsrfToken = (token) => {
  sessionStorage.setItem('csrf_token', token);
};

/**
 * Get CSRF token
 */
export const getCsrfToken = () => {
  return sessionStorage.getItem('csrf_token');
};

/**
 * Hash sensitive data (client-side hashing for comparison only)
 */
export const hashData = async (data) => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Validate phone number format
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Remove script tags and dangerous attributes
 * Note: For comprehensive XSS protection, use sanitizeHtml() instead
 * This function is kept for backward compatibility but relies on DOMPurify
 */
export const removeScriptTags = (html) => {
  // Use DOMPurify for comprehensive sanitization
  // This avoids regex-based sanitization which can have edge cases
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href'],
  });
};

/**
 * Escape HTML entities
 */
export const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, char => map[char]);
};

/**
 * Check if content contains suspicious patterns
 */
export const hasSuspiciousPatterns = (content) => {
  const patterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
  ];
  
  return patterns.some(pattern => pattern.test(content));
};
