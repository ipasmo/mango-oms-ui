import axiosInstance from './axiosInstance';

export const adminApi = {
  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await axiosInstance.get('/admin/dashboard');
    return response.data;
  },
  
  // Get all orders (admin)
  getAllOrders: async (params = {}) => {
    const response = await axiosInstance.get('/admin/orders', { params });
    return response.data;
  },
  
  // Update order status
  updateOrderStatus: async (orderId, status) => {
    const response = await axiosInstance.put(`/admin/orders/${orderId}/status`, {
      status,
    });
    return response.data;
  },
  
  // Create product
  createProduct: async (productData) => {
    const response = await axiosInstance.post('/admin/products', productData);
    return response.data;
  },
  
  // Update product
  updateProduct: async (productId, productData) => {
    const response = await axiosInstance.put(
      `/admin/products/${productId}`,
      productData
    );
    return response.data;
  },
  
  // Delete product
  deleteProduct: async (productId) => {
    const response = await axiosInstance.delete(`/admin/products/${productId}`);
    return response.data;
  },
  
  // Update inventory
  updateInventory: async (productId, quantity) => {
    const response = await axiosInstance.put(
      `/admin/products/${productId}/inventory`,
      { quantity }
    );
    return response.data;
  },
  
  // Get users list
  getUsers: async (params = {}) => {
    const response = await axiosInstance.get('/admin/users', { params });
    return response.data;
  },
};