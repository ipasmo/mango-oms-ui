import { create } from 'zustand';
import { orderApi } from '@api/orderApi';
import { toast } from 'react-toastify';

const useOrderStore = create((set, get) => ({
  orders: [],
  currentOrder: null,
  orderStats: null,
  isLoading: false,
  
  // Create order
  createOrder: async (orderData) => {
    set({ isLoading: true });
    try {
      const order = await orderApi.createOrder(orderData);
      set({ currentOrder: order, isLoading: false });
      toast.success('Order placed successfully!');
      return order;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  // Fetch user orders
  fetchOrders: async (params = {}) => {
    set({ isLoading: true });
    try {
      const data = await orderApi.getUserOrders(params);
      set({ orders: data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  // Fetch single order
  fetchOrderById: async (id) => {
    set({ isLoading: true });
    try {
      const order = await orderApi.getOrderById(id);
      set({ currentOrder: order, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  // Cancel order
  cancelOrder: async (id) => {
    try {
      await orderApi.cancelOrder(id);
      const orders = get().orders.map((order) =>
        order.id === id ? { ...order, status: 'cancelled' } : order
      );
      set({ orders });
      toast.success('Order cancelled successfully');
    } catch (error) {
      throw error;
    }
  },
  
  // Fetch order statistics
  fetchOrderStats: async () => {
    try {
      const stats = await orderApi.getOrderStats();
      set({ orderStats: stats });
    } catch (error) {
      console.error('Failed to fetch order stats:', error);
    }
  },
}));

export default useOrderStore;