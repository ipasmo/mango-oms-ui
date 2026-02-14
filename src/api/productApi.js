import axiosInstance from './axiosInstance';

export const productApi = {
  // Get all products with filters
  getProducts: async (params = {}) => {
    const response = await axiosInstance.get('/products', { params });
    return response.data;
  },
  
  // Get single product by ID
  getProductById: async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },
  
  // Search products
  searchProducts: async (query) => {
    const response = await axiosInstance.get('/products/search', {
      params: { q: query },
    });
    return response.data;
  },
  
  // Get featured products
  getFeaturedProducts: async () => {
    const response = await axiosInstance.get('/products/featured');
    return response.data;
  },
  
  // Get product by variety
  getProductsByVariety: async (variety) => {
    const response = await axiosInstance.get(`/products/variety/${variety}`);
    return response.data;
  },
};