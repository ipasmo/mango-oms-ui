import { useState, useEffect } from 'react';
import { cn } from '@utils/helpers';
import useDebounce from '@hooks/useDebounce';

/**
 * SearchBar Component
 * Search input with debounce functionality and clear button
 * 
 * @param {string} value - Controlled input value
 * @param {Function} onChange - Callback when search value changes
 * @param {Function} onSearch - Callback for search action (debounced)
 * @param {string} placeholder - Placeholder text
 * @param {number} debounceDelay - Debounce delay in ms
 */
const SearchBar = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search products...',
  debounceDelay = 500,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  // Update local state when prop changes
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Trigger search when debounced value changes
  useEffect(() => {
    if (onSearch && debouncedSearchTerm !== value) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setSearchTerm('');
    onChange?.('');
    onSearch?.('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className="relative">
        {/* Search Icon */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            'block w-full rounded-lg border border-gray-300',
            'bg-white py-3 pl-10 pr-12',
            'text-gray-900 placeholder-gray-500',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500',
            'transition-colors duration-200'
          )}
          aria-label="Search products"
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              'absolute inset-y-0 right-0 flex items-center pr-3',
              'text-gray-400 hover:text-gray-600 transition-colors'
            )}
            aria-label="Clear search"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search suggestions or results count could go here */}
      {searchTerm && searchTerm !== debouncedSearchTerm && (
        <div className="absolute top-full left-0 right-0 mt-1 text-sm text-gray-500">
          <span className="sr-only">Searching...</span>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
