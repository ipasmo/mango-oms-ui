import axiosInstance from './axiosInstance';

/**
 * Get all products with optional filters
 */
export const getProducts = async (params = {}) => {
  const response = await axiosInstance.get('/products', { params });
  return response.data;
};

/**
 * Get a single product by ID
 */
export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

/**
 * Search products
 */
export const searchProducts = async (query, filters = {}) => {
  const response = await axiosInstance.get('/products/search', {
    params: { q: query, ...filters },
  });
  return response.data;
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async (limit = 6) => {
  const response = await axiosInstance.get('/products/featured', {
    params: { limit },
  });
  return response.data;
};

/**
 * Get product reviews
 */
export const getProductReviews = async (productId, page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/products/${productId}/reviews`, {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Add product review
 */
export const addProductReview = async (productId, reviewData) => {
  const response = await axiosInstance.post(
    `/products/${productId}/reviews`,
    reviewData
  );
  return response.data;
};

/**
 * Get product categories
 */
export const getCategories = async () => {
  const response = await axiosInstance.get('/products/categories');
  return response.data;
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (categoryId, params = {}) => {
  const response = await axiosInstance.get(
    `/products/category/${categoryId}`,
    { params }
  );
  return response.data;
};

/**
 * Check product availability
 */
export const checkProductAvailability = async (productId, quantity) => {
  const response = await axiosInstance.get(
    `/products/${productId}/availability`,
    { params: { quantity } }
  );
  return response.data;
};

/**
 * Get related products
 */
export const getRelatedProducts = async (productId, limit = 4) => {
  const response = await axiosInstance.get(
    `/products/${productId}/related`,
    { params: { limit } }
  );
  return response.data;
};
