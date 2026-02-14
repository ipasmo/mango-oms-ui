import { cn } from '@utils/helpers';
import { formatCurrency, formatWeight } from '@utils/formatters';

/**
 * CartItem Component
 * Single cart item with image, name, quantity controls, and remove button
 * 
 * @param {Object} item - Cart item object with product, quantity, lotSize
 * @param {string} currency - Currency code
 * @param {Function} onQuantityChange - Callback when quantity changes
 * @param {Function} onRemove - Callback when item is removed
 * @param {boolean} readonly - Disable controls (for checkout view)
 */
const CartItem = ({
  item,
  currency = 'USD',
  onQuantityChange,
  onRemove,
  readonly = false,
  className,
}) => {
  const { product, quantity, lotSize } = item;
  const price = product.prices?.[lotSize] || product.price || 0;
  const total = price * quantity;

  const handleIncrement = () => {
    if (!readonly && onQuantityChange) {
      onQuantityChange(item.id, lotSize, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (!readonly && onQuantityChange && quantity > 1) {
      onQuantityChange(item.id, lotSize, quantity - 1);
    }
  };

  const handleQuantityInput = (e) => {
    if (!readonly && onQuantityChange) {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value) && value > 0) {
        onQuantityChange(item.id, lotSize, value);
      }
    }
  };

  const handleRemove = () => {
    if (!readonly && onRemove) {
      onRemove(item.id, lotSize);
    }
  };

  return (
    <div
      className={cn(
        'flex gap-4 rounded-lg border border-gray-200 bg-white p-4',
        'hover:shadow-md transition-shadow',
        className
      )}
      role="listitem"
      aria-label={`Cart item: ${product.name}`}
    >
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          className="h-24 w-24 rounded-md object-cover"
        />
      </div>

      {/* Item Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Size: {formatWeight(lotSize)}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {formatCurrency(price, currency)} each
            </p>
          </div>

          {/* Remove Button */}
          {!readonly && (
            <button
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-600 transition-colors"
              aria-label={`Remove ${product.name} from cart`}
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Quantity Controls and Total */}
        <div className="flex items-center justify-between mt-2">
          {/* Quantity Controls */}
          {readonly ? (
            <div className="text-sm text-gray-600">
              Quantity: {quantity}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-md border border-gray-300',
                  'hover:bg-gray-100 transition-colors',
                  quantity <= 1 && 'opacity-50 cursor-not-allowed'
                )}
                aria-label="Decrease quantity"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityInput}
                className={cn(
                  'w-16 text-center rounded-md border border-gray-300 py-1',
                  'focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500'
                )}
                aria-label="Quantity"
              />
              
              <button
                onClick={handleIncrement}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-md border border-gray-300',
                  'hover:bg-gray-100 transition-colors'
                )}
                aria-label="Increase quantity"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          )}

          {/* Item Total */}
          <div className="text-lg font-bold text-gray-900">
            {formatCurrency(total, currency)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
