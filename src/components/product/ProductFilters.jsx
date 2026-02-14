import { useState, useEffect } from 'react';
import { cn } from '@utils/helpers';
import Button from '@components/common/Button';
import Card from '@components/common/Card';

/**
 * ProductFilters Component
 * Sidebar/panel with filters for category, price range, and sort options
 * 
 * @param {Array} categories - Available categories
 * @param {Object} filters - Current filter values
 * @param {Function} onFilterChange - Callback when filters change
 * @param {boolean} showMobile - Show mobile version
 * @param {Function} onClose - Close callback for mobile
 */
const ProductFilters = ({
  categories = [],
  filters = {
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'featured',
  },
  onFilterChange,
  showMobile = false,
  onClose,
  className,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A-Z' },
    { value: 'name-desc', label: 'Name: Z-A' },
  ];

  const handleCategoryChange = (category) => {
    const newFilters = {
      ...localFilters,
      category: localFilters.category === category ? '' : category,
    };
    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePriceChange = (type, value) => {
    const newFilters = {
      ...localFilters,
      [type]: Number(value),
    };
    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSortChange = (sortBy) => {
    const newFilters = {
      ...localFilters,
      sortBy,
    };
    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      category: '',
      minPrice: 0,
      maxPrice: 1000,
      sortBy: 'featured',
    };
    setLocalFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  const hasActiveFilters = 
    localFilters.category !== '' ||
    localFilters.minPrice !== 0 ||
    localFilters.maxPrice !== 1000 ||
    localFilters.sortBy !== 'featured';

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {showMobile && onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close filters"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Sort By */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Sort By</h3>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={localFilters.sortBy === option.value}
                onChange={() => handleSortChange(option.value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="space-y-3 border-t pt-6">
          <h3 className="text-sm font-medium text-gray-900">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.id || category.name}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={localFilters.category === category.id || localFilters.category === category.name}
                  onChange={() => handleCategoryChange(category.id || category.name)}
                  className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {category.name}
                  {category.count && (
                    <span className="ml-1 text-gray-500">({category.count})</span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-3 border-t pt-6">
        <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="min-price" className="block text-xs text-gray-600 mb-1">
              Min Price: ${localFilters.minPrice}
            </label>
            <input
              id="min-price"
              type="range"
              min="0"
              max="500"
              step="5"
              value={localFilters.minPrice}
              onChange={(e) => handlePriceChange('minPrice', e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              aria-label="Minimum price filter"
            />
          </div>
          <div>
            <label htmlFor="max-price" className="block text-xs text-gray-600 mb-1">
              Max Price: ${localFilters.maxPrice}
            </label>
            <input
              id="max-price"
              type="range"
              min="0"
              max="1000"
              step="10"
              value={localFilters.maxPrice}
              onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              aria-label="Maximum price filter"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${localFilters.minPrice}</span>
            <span>-</span>
            <span>${localFilters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <div className="border-t pt-6">
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={handleReset}
            aria-label="Reset all filters"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );

  // Mobile version (overlay)
  if (showMobile) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 flex max-w-full pr-10">
            <div className="w-screen max-w-sm">
              <Card className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                {content}
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <Card className={cn('sticky top-4', className)} aria-label="Product filters">
      {content}
    </Card>
  );
};

export default ProductFilters;
