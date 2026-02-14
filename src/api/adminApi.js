import axiosInstance from './axiosInstance';

/**
 * Get admin dashboard statistics
 */
export const getAdminStats = async () => {
  const response = await axiosInstance.get('/admin/stats');
  return response.data;
};

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (params = {}) => {
  const response = await axiosInstance.get('/admin/users', { params });
  return response.data;
};

/**
 * Get user by ID (admin only)
 */
export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/admin/users/${id}`);
  return response.data;
};

/**
 * Update user status (admin only)
 */
export const updateUserStatus = async (id, status) => {
  const response = await axiosInstance.patch(`/admin/users/${id}/status`, {
    status,
  });
  return response.data;
};

/**
 * Delete user (admin only)
 */
export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/admin/users/${id}`);
  return response.data;
};

/**
 * Get all orders (admin only)
 */
export const getAllOrders = async (params = {}) => {
  const response = await axiosInstance.get('/admin/orders', { params });
  return response.data;
};

/**
 * Update order status (admin only)
 */
export const updateOrderStatus = async (id, status) => {
  const response = await axiosInstance.patch(`/admin/orders/${id}/status`, {
    status,
  });
  return response.data;
};

/**
 * Create product (admin only)
 */
export const createProduct = async (productData) => {
  const response = await axiosInstance.post('/admin/products', productData);
  return response.data;
};

/**
 * Update product (admin only)
 */
export const updateProduct = async (id, productData) => {
  const response = await axiosInstance.put(`/admin/products/${id}`, productData);
  return response.data;
};

/**
 * Delete product (admin only)
 */
export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/admin/products/${id}`);
  return response.data;
};

/**
 * Update product inventory (admin only)
 */
export const updateProductInventory = async (id, inventoryData) => {
  const response = await axiosInstance.patch(
    `/admin/products/${id}/inventory`,
    inventoryData
  );
  return response.data;
};

/**
 * Get sales analytics (admin only)
 */
export const getSalesAnalytics = async (period = '30days') => {
  const response = await axiosInstance.get('/admin/analytics/sales', {
    params: { period },
  });
  return response.data;
};

/**
 * Get revenue analytics (admin only)
 */
export const getRevenueAnalytics = async (period = '30days') => {
  const response = await axiosInstance.get('/admin/analytics/revenue', {
    params: { period },
  });
  return response.data;
};

/**
 * Export data (admin only)
 */
export const exportData = async (type, format = 'csv') => {
  const response = await axiosInstance.get(`/admin/export/${type}`, {
    params: { format },
    responseType: 'blob',
  });
  return response.data;
};
