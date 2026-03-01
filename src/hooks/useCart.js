import useCartStore from '@store/cartStore';
import { formatCurrency } from '@utils/formatters';

/**
 * Custom hook for cart management
 * Provides cart state and actions with convenience methods
 */
const useCart = () => {
  const {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getCount,
    toggleCart,
    openCart,
    closeCart,
    isInCart,
    getItemQuantity,
  } = useCartStore();

  // Add item with notification
  const addItemWithNotification = (product, quantity = 1, lotSize = 3) => {
    try {
      addItem(product, quantity, lotSize);
      return true;
    } catch (error) {
      console.error('Failed to add item:', error);
      return false;
    }
  };

  // Get formatted total
  const getFormattedTotal = (currency = 'USD') => {
    return formatCurrency(getTotal(), currency);
  };

  // Get subtotal (before taxes/shipping)
  const getSubtotal = () => {
    return getTotal();
  };

  // Calculate taxes (example: 10%)
  const getTax = (rate = 0.1) => {
    return getTotal() * rate;
  };

  // Calculate shipping (example: free over $50)
  const getShipping = (freeShippingThreshold = 50, shippingCost = 5) => {
    const total = getTotal();
    return total >= freeShippingThreshold ? 0 : shippingCost;
  };

  // Get grand total (subtotal + tax + shipping)
  const getGrandTotal = (taxRate = 0.1) => {
    const subtotal = getSubtotal();
    const tax = getTax(taxRate);
    const shipping = getShipping();
    return subtotal + tax + shipping;
  };

  // Check if cart is empty
  const isEmpty = () => {
    return items.length === 0;
  };

  // Get cart summary
  const getSummary = (taxRate = 0.1, currency = 'USD') => {
    const subtotal = getSubtotal();
    const tax = getTax(taxRate);
    const shipping = getShipping();
    const total = getGrandTotal(taxRate);
    
    return {
      subtotal,
      tax,
      shipping,
      total,
      formattedSubtotal: formatCurrency(subtotal, currency),
      formattedTax: formatCurrency(tax, currency),
      formattedShipping: formatCurrency(shipping, currency),
      formattedTotal: formatCurrency(total, currency),
      itemCount: getCount(),
    };
  };

  return {
    // State
    items,
    isOpen,
    isEmpty: isEmpty(),
    itemCount: getCount(),
    total: getTotal(),
    
    // Actions
    addItem: addItemWithNotification,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    
    // Query methods
    isInCart,
    getItemQuantity,
    
    // Calculations
    getTotal,
    getSubtotal,
    getTax,
    getShipping,
    getGrandTotal,
    getFormattedTotal,
    getSummary,
  };
};

export default useCart;
