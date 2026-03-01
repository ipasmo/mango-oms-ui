import axiosInstance from './axiosInstance';

/**
 * Create a new order
 */
export const createOrder = async (orderData) => {
  return await axiosInstance.post('/orders', orderData);
};

/**
 * Get all orders for the current user
 */
export const getOrders = async (params = {}) => {
  return await axiosInstance.get('/orders', { params });
};

/**
 * Get a single order by ID
 */
export const getOrderById = async (id) => {
  return await axiosInstance.get(`/orders/${id}`);
};

/**
 * Cancel an order
 */
export const cancelOrder = async (id, reason = '') => {
  return await axiosInstance.post(`/orders/${id}/cancel`, { reason });
};

/**
 * Get order tracking information
 */
export const getOrderTracking = async (id) => {
  return await axiosInstance.get(`/orders/${id}/tracking`);
};

/**
 * Get order statistics for dashboard
 */
export const getOrderStats = async (period = '30days') => {
  return await axiosInstance.get('/orders/stats', {
    params: { period },
  });
};

/**
 * Reorder (create new order from existing order)
 */
export const reorder = async (orderId) => {
  return await axiosInstance.post(`/orders/${orderId}/reorder`);
};

/**
 * Update order delivery address
 */
export const updateOrderAddress = async (orderId, addressData) => {
  return await axiosInstance.put(
    `/orders/${orderId}/address`,
    addressData
  );
};

/**
 * Get order invoice
 */
export const getOrderInvoice = async (orderId) => {
  return await axiosInstance.get(`/orders/${orderId}/invoice`, {
    responseType: 'blob',
  });
};

/**
 * Submit order feedback
 */
export const submitOrderFeedback = async (orderId, feedbackData) => {
  return await axiosInstance.post(
    `/orders/${orderId}/feedback`,
    feedbackData
  );
};

/**
 * Calculate order totals
 */
export const calculateOrderTotals = async (orderData) => {
  return await axiosInstance.post('/orders/calculate', orderData);
};
