import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Add item to cart
      addItem: (product, lotSize, quantity = 1) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (item) => item.product.id === product.id && item.lotSize === lotSize
        );
        
        if (existingItemIndex > -1) {
          // Update quantity if item exists
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
          toast.success('Cart updated');
        } else {
          // Add new item
          set({
            items: [
              ...items,
              {
                product,
                lotSize,
                quantity,
                price: product.prices[lotSize],
              },
            ],
          });
          toast.success(`${product.name} added to cart`);
        }
      },
      
      // Remove item from cart
      removeItem: (productId, lotSize) => {
        const items = get().items.filter(
          (item) => !(item.product.id === productId && item.lotSize === lotSize)
        );
        set({ items });
        toast.info('Item removed from cart');
      },
      
      // Update quantity
      updateQuantity: (productId, lotSize, quantity) => {
        if (quantity < 1) return;
        
        const items = get().items.map((item) =>
          item.product.id === productId && item.lotSize === lotSize
            ? { ...item, quantity }
            : item
        );
        set({ items });
      },
      
      // Clear cart
      clearCart: () => {
        set({ items: [] });
      },
      
      // Get cart total
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      
      // Get item count
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;