import { useEffect } from 'react';
import { cn } from '@utils/helpers';
import useCart from '@hooks/useCart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import Button from '@components/common/Button';

/**
 * CartDrawer Component
 * Slide-out drawer showing cart items and summary
 * 
 * @param {Function} onCheckout - Callback when checkout button is clicked
 * @param {string} currency - Currency code
 */
const CartDrawer = ({ onCheckout, currency = 'USD' }) => {
  const {
    items,
    isOpen,
    isEmpty,
    closeCart,
    removeItem,
    updateQuantity,
    getSummary,
  } = useCart();

  const summary = getSummary(0.1, currency);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    closeCart();
    onCheckout?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          className={cn(
            'w-screen max-w-md transform transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex h-full flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2
                id="cart-drawer-title"
                className="text-lg font-semibold text-gray-900"
              >
                Shopping Cart
                {!isEmpty && (
                  <span className="ml-2 text-sm font-normal text-gray-600">
                    ({summary.itemCount} {summary.itemCount === 1 ? 'item' : 'items'})
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close cart"
              >
                <svg
                  className="h-6 w-6"
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
            </div>

            {/* Cart Content */}
            {isEmpty ? (
              // Empty State
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <svg
                  className="h-24 w-24 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900">
                  Your cart is empty
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Add some delicious mangoes to get started!
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={closeCart}
                  className="mt-6"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="space-y-4" role="list" aria-label="Cart items">
                    {items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        currency={currency}
                        onQuantityChange={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer with Summary and Actions */}
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                  <CartSummary
                    subtotal={summary.subtotal}
                    tax={summary.tax}
                    shipping={summary.shipping}
                    total={summary.total}
                    currency={currency}
                    compact
                  />

                  <div className="mt-6 space-y-3">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      fullWidth
                      onClick={closeCart}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
