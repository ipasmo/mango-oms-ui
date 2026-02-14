import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CART_KEY, MAX_CART_ITEMS } from '@utils/constants';

/**
 * Cart Store
 * Manages shopping cart state with localStorage persistence
 */
const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      isOpen: false,

      // Add item to cart
      addItem: (product, quantity = 1, lotSize = 3) => {
        const { items } = get();
        
        // Check max cart items
        if (items.length >= MAX_CART_ITEMS) {
          throw new Error(`Cannot add more than ${MAX_CART_ITEMS} items to cart`);
        }
        
        // Check if item already exists
        const existingItemIndex = items.findIndex(
          (item) => item.id === product.id && item.lotSize === lotSize
        );
        
        if (existingItemIndex !== -1) {
          // Update quantity
          const newItems = [...items];
          newItems[existingItemIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          // Add new item
          const newItem = {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            lotSize,
            quantity,
          };
          set({ items: [...items, newItem] });
        }
      },

      // Remove item from cart
      removeItem: (itemId, lotSize) => {
        const { items } = get();
        const newItems = items.filter(
          (item) => !(item.id === itemId && item.lotSize === lotSize)
        );
        set({ items: newItems });
      },

      // Update item quantity
      updateQuantity: (itemId, lotSize, quantity) => {
        const { items } = get();
        
        if (quantity <= 0) {
          get().removeItem(itemId, lotSize);
          return;
        }
        
        const newItems = items.map((item) =>
          item.id === itemId && item.lotSize === lotSize
            ? { ...item, quantity }
            : item
        );
        
        set({ items: newItems });
      },

      // Clear cart
      clearCart: () => set({ items: [] }),

      // Get cart total
      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      // Get cart count
      getCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      // Toggle cart drawer
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      // Open cart drawer
      openCart: () => set({ isOpen: true }),

      // Close cart drawer
      closeCart: () => set({ isOpen: false }),

      // Check if item is in cart
      isInCart: (productId, lotSize) => {
        const { items } = get();
        return items.some((item) => item.id === productId && item.lotSize === lotSize);
      },

      // Get item quantity
      getItemQuantity: (productId, lotSize) => {
        const { items } = get();
        const item = items.find((item) => item.id === productId && item.lotSize === lotSize);
        return item?.quantity || 0;
      },
    }),
    {
      name: CART_KEY,
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;
