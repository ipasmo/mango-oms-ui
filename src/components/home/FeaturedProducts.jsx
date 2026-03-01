import { cn } from '@utils/helpers';
import ProductCard from '@components/product/ProductCard';
import Button from '@components/common/Button';
import Spinner from '@components/common/Spinner';

/**
 * FeaturedProducts Component
 * Grid of featured products using ProductCard component
 * 
 * @param {Array} products - Featured products array
 * @param {string} title - Section title
 * @param {string} subtitle - Section subtitle
 * @param {string} currency - Currency code
 * @param {Function} onProductClick - Product click handler
 * @param {Function} onViewAll - View all button click handler
 * @param {boolean} loading - Loading state
 * @param {number} limit - Maximum number of products to show
 */
const FeaturedProducts = ({
  products = [],
  title = 'Featured Products',
  subtitle = 'Our most popular mangoes, loved by customers',
  currency = 'USD',
  onProductClick,
  onViewAll,
  loading = false,
  limit = 8,
  className,
}) => {
  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <section
      className={cn('py-12 md:py-16 lg:py-20', className)}
      aria-labelledby="featured-products-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center md:mb-12">
          <h2
            id="featured-products-title"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Spinner size="lg" text="Loading featured products..." />
          </div>
        )}

        {/* Products Grid */}
        {!loading && displayedProducts.length > 0 && (
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            role="list"
            aria-label="Featured products"
          >
            {displayedProducts.map((product) => (
              <div key={product.id} role="listitem">
                <ProductCard
                  product={product}
                  currency={currency}
                  onClick={onProductClick}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && displayedProducts.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-900">
              No featured products available
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Check back later for our featured collection
            </p>
          </div>
        )}

        {/* View All Button */}
        {!loading && displayedProducts.length > 0 && onViewAll && (
          <div className="mt-8 text-center md:mt-12">
            <Button
              variant="primary"
              size="lg"
              onClick={onViewAll}
              className="min-w-[200px]"
            >
              View All Products
              <svg
                className="ml-2 -mr-1 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
