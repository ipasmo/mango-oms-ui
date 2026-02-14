import { useEffect } from 'react';

/**
 * Custom hook for debouncing function calls
 * @param {Function} callback - Function to debounce
 * @param {Array} dependencies - Dependencies array
 * @param {number} delay - Delay in milliseconds
 */
const useDebounce = (callback, dependencies, delay = 500) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [...dependencies, delay]);
};

export default useDebounce;