import { useState } from 'react';
import { cn } from '@utils/helpers';
import { formatCurrency } from '@utils/formatters';
import { LOT_SIZES } from '@utils/constants';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import useCart from '@hooks/useCart';

/**
 * ProductCard Component
 * Displays a product with image, name, prices for different lot sizes, and add to cart functionality
 * 
 * @param {Object} product - Product object with id, name, image, description, prices
 * @param {string} currency - Currency code (default: 'USD')
 * @param {Function} onClick - Callback when card is clicked
 */
const ProductCard = ({ product, currency = 'USD', onClick, className }) => {
  const [selectedLotSize, setSelectedLotSize] = useState(LOT_SIZES.SMALL.value);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const lotSizeOptions = [
    { ...LOT_SIZES.SMALL, id: '3kg' },
    { ...LOT_SIZES.MEDIUM, id: '5kg' },
    { ...LOT_SIZES.LARGE, id: '10kg' },
  ];

  const selectedOption = lotSizeOptions.find(opt => opt.value === selectedLotSize);
  const currentPrice = product.prices?.[selectedLotSize] || selectedOption?.price || 0;

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAdding(true);
    
    try {
      const success = addItem(product, 1, selectedLotSize);
      if (success) {
        // Optional: Show success feedback
        setTimeout(() => setIsAdding(false), 500);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  return (
    <Card
      hoverable
      className={cn('group relative overflow-hidden', className)}
      onClick={handleCardClick}
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        {product.featured && (
          <span className="absolute top-2 left-2 rounded-full bg-primary-600 px-2 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        )}
        {product.discount && (
          <span className="absolute top-2 right-2 rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-4 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* Lot Size Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Size:
          </label>
          <div className="flex gap-2">
            {lotSizeOptions.map((option) => (
              <button
                key={option.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLotSize(option.value);
                }}
                className={cn(
                  'flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors',
                  selectedLotSize === option.value
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                )}
                aria-label={`Select ${option.label} size`}
                aria-pressed={selectedLotSize === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(currentPrice, currency)}
            </p>
            {product.originalPrice && product.originalPrice > currentPrice && (
              <p className="text-sm text-gray-500 line-through">
                {formatCurrency(product.originalPrice, currency)}
              </p>
            )}
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleAddToCart}
            loading={isAdding}
            disabled={isAdding}
            className="whitespace-nowrap"
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600">
                ✓ In Stock {product.stock < 10 && `(${product.stock} left)`}
              </span>
            ) : (
              <span className="text-red-600">✗ Out of Stock</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
