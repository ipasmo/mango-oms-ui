import useCartStore from '@store/cartStore';

/**
 * Custom hook for cart operations
 * @returns {Object} Cart state and methods
 */
const useCart = () => {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  } = useCartStore();
  
  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total: getTotal(),
    itemCount: getItemCount(),
  };
};

export default useCart;