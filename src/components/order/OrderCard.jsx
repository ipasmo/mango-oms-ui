import { formatCurrency, formatDate } from '@utils/formatters';
import { cn } from '@utils/helpers';
import Card from '@components/common/Card';
import OrderStatusBadge from './OrderStatusBadge';

/**
 * OrderCard Component
 * Card showing order summary with date, status, items, and total
 * 
 * @param {Object} order - Order object with id, date, status, items, total
 * @param {string} currency - Currency code
 * @param {Function} onClick - Callback when card is clicked
 * @param {boolean} showDetails - Show detailed item list
 */
const OrderCard = ({
  order,
  currency = 'USD',
  onClick,
  showDetails = false,
  className,
}) => {
  const {
    id,
    orderNumber,
    date,
    status,
    items = [],
    total,
    shippingAddress,
  } = order;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleClick = () => {
    if (onClick) {
      onClick(order);
    }
  };

  return (
    <Card
      hoverable
      className={cn('cursor-pointer', className)}
      onClick={handleClick}
      role="article"
      aria-label={`Order ${orderNumber || id}`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900">
              Order #{orderNumber || id}
            </h3>
            <p className="text-sm text-gray-600">
              {formatDate(date, 'datetime')}
            </p>
          </div>
          <OrderStatusBadge status={status} />
        </div>

        {/* Items Summary */}
        <div className="border-t border-gray-200 pt-4">
          {showDetails ? (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">Items:</h4>
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-3">
                      {item.product?.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-12 w-12 rounded object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.product?.name || item.name}
                        </p>
                        <p className="text-gray-600">
                          Qty: {item.quantity} × {formatCurrency(item.price, currency)}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(item.price * item.quantity, currency)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {items.slice(0, 3).map((item, index) => (
                  <img
                    key={index}
                    src={item.product?.image || '/placeholder-product.jpg'}
                    alt={item.product?.name || item.name}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-700">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
                {items.length > 3 && ` (${items.length} products)`}
              </p>
            </div>
          )}
        </div>

        {/* Shipping Address */}
        {shippingAddress && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              Shipping Address:
            </h4>
            <p className="text-sm text-gray-600">
              {shippingAddress.street}, {shippingAddress.city},{' '}
              {shippingAddress.state} {shippingAddress.zipCode}
            </p>
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <span className="text-base font-medium text-gray-700">Total:</span>
          <span className="text-xl font-bold text-primary-600">
            {formatCurrency(total, currency)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 border-t border-gray-200 pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(order);
            }}
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View Details
          </button>
          {status === 'delivered' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle reorder
              }}
              className="flex-1 rounded-md border border-primary-600 bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
            >
              Order Again
            </button>
          )}
          {status === 'pending' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle cancel
              }}
              className="flex-1 rounded-md border border-red-600 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;
