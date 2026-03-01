import { create } from 'zustand';
import * as orderApi from '@api/orderApi';

/**
 * Order Store
 * Manages order state and history
 */
const useOrderStore = create((set, get) => ({
  // State
  orders: [],
  currentOrder: null,
  orderStats: null,
  isLoading: false,
  error: null,
  
  // Pagination
  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
  totalOrders: 0,

  // Fetch orders
  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const { currentPage, pageSize } = get();
      
      const params = {
        page: currentPage,
        limit: pageSize,
      };
      
      const data = await orderApi.getOrders(params);
      
      set({
        orders: data.orders || data,
        totalPages: data.totalPages || 1,
        totalOrders: data.total || data.length,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  // Fetch single order
  fetchOrderById: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await orderApi.getOrderById(id);
      set({
        currentOrder: data.order || data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  // Create order
  createOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await orderApi.createOrder(orderData);
      set({
        currentOrder: data.order || data,
        isLoading: false,
      });
      
      // Refresh orders list
      get().fetchOrders();
      
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Cancel order
  cancelOrder: async (orderId, reason = '') => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await orderApi.cancelOrder(orderId, reason);
      
      // Update order in list
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === orderId ? { ...order, status: 'cancelled' } : order
        ),
        isLoading: false,
      }));
      
      // Update current order if it's the one being cancelled
      if (get().currentOrder?.id === orderId) {
        set({ currentOrder: { ...get().currentOrder, status: 'cancelled' } });
      }
      
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch order stats
  fetchOrderStats: async (period = '30days') => {
    try {
      const data = await orderApi.getOrderStats(period);
      set({ orderStats: data });
    } catch (error) {
      console.error('Failed to fetch order stats:', error);
    }
  },

  // Get order tracking
  getOrderTracking: async (orderId) => {
    try {
      const data = await orderApi.getOrderTracking(orderId);
      return data;
    } catch (error) {
      console.error('Failed to fetch order tracking:', error);
      throw error;
    }
  },

  // Reorder
  reorder: async (orderId) => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await orderApi.reorder(orderId);
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Set page
  setPage: (page) => {
    set({ currentPage: page });
    get().fetchOrders();
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Clear current order
  clearCurrentOrder: () => set({ currentOrder: null }),

  // Reset store
  reset: () => set({
    orders: [],
    currentOrder: null,
    orderStats: null,
    currentPage: 1,
  }),
}));

export default useOrderStore;
