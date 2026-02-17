import axiosInstance from './axiosInstance';

/**
 * Get admin dashboard statistics
 */
export const getAdminStats = async () => {
  return await axiosInstance.get('/admin/stats');
};

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (params = {}) => {
  return await axiosInstance.get('/admin/users', { params });
};

/**
 * Get user by ID (admin only)
 */
export const getUserById = async (id) => {
  return await axiosInstance.get(`/admin/users/${id}`);
};

/**
 * Update user status (admin only)
 */
export const updateUserStatus = async (id, status) => {
  return await axiosInstance.patch(`/admin/users/${id}/status`, {
    status,
  });
};

/**
 * Delete user (admin only)
 */
export const deleteUser = async (id) => {
  return await axiosInstance.delete(`/admin/users/${id}`);
};

/**
 * Get all orders (admin only)
 */
export const getAllOrders = async (params = {}) => {
  return await axiosInstance.get('/admin/orders', { params });
};

/**
 * Update order status (admin only)
 */
export const updateOrderStatus = async (id, status) => {
  return await axiosInstance.patch(`/admin/orders/${id}/status`, {
    status,
  });
};

/**
 * Create product (admin only)
 */
export const createProduct = async (productData) => {
  return await axiosInstance.post('/admin/products', productData);
};

/**
 * Update product (admin only)
 */
export const updateProduct = async (id, productData) => {
  return await axiosInstance.put(`/admin/products/${id}`, productData);
};

/**
 * Delete product (admin only)
 */
export const deleteProduct = async (id) => {
  return await axiosInstance.delete(`/admin/products/${id}`);
};

/**
 * Update product inventory (admin only)
 */
export const updateProductInventory = async (id, inventoryData) => {
  return await axiosInstance.patch(
    `/admin/products/${id}/inventory`,
    inventoryData
  );
};

/**
 * Get sales analytics (admin only)
 */
export const getSalesAnalytics = async (period = '30days') => {
  return await axiosInstance.get('/admin/analytics/sales', {
    params: { period },
  });
};

/**
 * Get revenue analytics (admin only)
 */
export const getRevenueAnalytics = async (period = '30days') => {
  return await axiosInstance.get('/admin/analytics/revenue', {
    params: { period },
  });
};

/**
 * Export data (admin only)
 */
export const exportData = async (type, format = 'csv') => {
  return await axiosInstance.get(`/admin/export/${type}`, {
    params: { format },
    responseType: 'blob',
  });
};
