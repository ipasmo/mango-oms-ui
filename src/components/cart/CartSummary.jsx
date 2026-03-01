import { formatCurrency } from '@utils/formatters';
import { cn } from '@utils/helpers';
import Card from '@components/common/Card';

/**
 * CartSummary Component
 * Displays subtotal, tax, shipping, and total with formatted currency
 * 
 * @param {number} subtotal - Subtotal amount
 * @param {number} tax - Tax amount
 * @param {number} shipping - Shipping amount
 * @param {number} total - Grand total amount
 * @param {string} currency - Currency code
 * @param {boolean} compact - Compact view without card wrapper
 */
const CartSummary = ({
  subtotal = 0,
  tax = 0,
  shipping = 0,
  total = 0,
  currency = 'USD',
  discount = 0,
  compact = false,
  className,
}) => {
  const summaryRows = [
    {
      label: 'Subtotal',
      value: subtotal,
      className: 'text-gray-700',
    },
    ...(discount > 0 ? [{
      label: 'Discount',
      value: -discount,
      className: 'text-green-600',
    }] : []),
    {
      label: 'Tax',
      value: tax,
      className: 'text-gray-700',
    },
    {
      label: 'Shipping',
      value: shipping,
      className: 'text-gray-700',
      note: shipping === 0 ? 'Free' : null,
    },
  ];

  const content = (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
      
      {/* Summary Rows */}
      <div className="space-y-2">
        {summaryRows.map((row, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <span className={cn('font-medium', row.className)}>
              {row.label}
              {row.note && (
                <span className="ml-2 text-xs text-green-600">({row.note})</span>
              )}
            </span>
            <span className={cn('font-semibold', row.className)}>
              {formatCurrency(row.value, currency)}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 pt-3" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-primary-600">
          {formatCurrency(total, currency)}
        </span>
      </div>

      {/* Free Shipping Notice */}
      {shipping === 0 && subtotal > 0 && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 mr-2 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            You qualify for free shipping!
          </div>
        </div>
      )}

      {/* Almost Free Shipping Notice */}
      {shipping > 0 && subtotal < 50 && subtotal > 0 && (
        <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 mr-2 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add {formatCurrency(50 - subtotal, currency)} more for free shipping
          </div>
        </div>
      )}
    </div>
  );

  if (compact) {
    return content;
  }

  return (
    <Card className="sticky top-4">
      {content}
    </Card>
  );
};

export default CartSummary;
