import axiosInstance from './axiosInstance';

/**
 * Create a new order
 */
export const createOrder = async (orderData) => {
  const response = await axiosInstance.post('/orders', orderData);
  return response.data;
};

/**
 * Get all orders for the current user
 */
export const getOrders = async (params = {}) => {
  const response = await axiosInstance.get('/orders', { params });
  return response.data;
};

/**
 * Get a single order by ID
 */
export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data;
};

/**
 * Cancel an order
 */
export const cancelOrder = async (id, reason = '') => {
  const response = await axiosInstance.post(`/orders/${id}/cancel`, { reason });
  return response.data;
};

/**
 * Get order tracking information
 */
export const getOrderTracking = async (id) => {
  const response = await axiosInstance.get(`/orders/${id}/tracking`);
  return response.data;
};

/**
 * Get order statistics for dashboard
 */
export const getOrderStats = async (period = '30days') => {
  const response = await axiosInstance.get('/orders/stats', {
    params: { period },
  });
  return response.data;
};

/**
 * Reorder (create new order from existing order)
 */
export const reorder = async (orderId) => {
  const response = await axiosInstance.post(`/orders/${orderId}/reorder`);
  return response.data;
};

/**
 * Update order delivery address
 */
export const updateOrderAddress = async (orderId, addressData) => {
  const response = await axiosInstance.put(
    `/orders/${orderId}/address`,
    addressData
  );
  return response.data;
};

/**
 * Get order invoice
 */
export const getOrderInvoice = async (orderId) => {
  const response = await axiosInstance.get(`/orders/${orderId}/invoice`, {
    responseType: 'blob',
  });
  return response.data;
};

/**
 * Submit order feedback
 */
export const submitOrderFeedback = async (orderId, feedbackData) => {
  const response = await axiosInstance.post(
    `/orders/${orderId}/feedback`,
    feedbackData
  );
  return response.data;
};

/**
 * Calculate order totals
 */
export const calculateOrderTotals = async (orderData) => {
  const response = await axiosInstance.post('/orders/calculate', orderData);
  return response.data;
};
