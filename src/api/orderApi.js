import axiosInstance from './axiosInstance';

export const orderApi = {
  // Create new order
  createOrder: async (orderData) => {
    const response = await axiosInstance.post('/orders', orderData);
    return response.data;
  },
  
  // Get user orders
  getUserOrders: async (params = {}) => {
    const response = await axiosInstance.get('/orders', { params });
    return response.data;
  },
  
  // Get single order
  getOrderById: async (id) => {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  },
  
  // Cancel order
  cancelOrder: async (id) => {
    const response = await axiosInstance.put(`/orders/${id}/cancel`);
    return response.data;
  },
  
  // Get order statistics
  getOrderStats: async () => {
    const response = await axiosInstance.get('/orders/stats');
    return response.data;
  },
  
  // Process payment
  processPayment: async (paymentData) => {
    const response = await axiosInstance.post('/payments/process', paymentData);
    return response.data;
  },
};