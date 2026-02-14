import { cn } from '@utils/helpers';
import ProductCard from './ProductCard';
import Spinner from '@components/common/Spinner';

/**
 * ProductGrid Component
 * Responsive grid layout for displaying multiple products
 * 
 * @param {Array} products - Array of product objects
 * @param {boolean} loading - Loading state
 * @param {boolean} error - Error state
 * @param {string} errorMessage - Error message to display
 * @param {string} emptyMessage - Message when no products
 * @param {string} currency - Currency code
 * @param {Function} onProductClick - Callback when product is clicked
 */
const ProductGrid = ({
  products = [],
  loading = false,
  error = false,
  errorMessage = 'Failed to load products',
  emptyMessage = 'No products found',
  currency = 'USD',
  onProductClick,
  columns = 4,
  className,
}) => {
  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner size="lg" text="Loading products..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <svg
          className="h-16 w-16 text-red-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-lg font-medium text-gray-900">{errorMessage}</p>
        <p className="mt-2 text-sm text-gray-600">Please try again later</p>
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <svg
          className="h-16 w-16 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p className="text-lg font-medium text-gray-900">{emptyMessage}</p>
        <p className="mt-2 text-sm text-gray-600">Try adjusting your filters</p>
      </div>
    );
  }

  const gridColumns = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  };

  return (
    <div
      className={cn(
        'grid gap-6',
        gridColumns[columns] || gridColumns[4],
        className
      )}
      role="list"
      aria-label="Product grid"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard
            product={product}
            currency={currency}
            onClick={onProductClick}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
