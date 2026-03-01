import axiosInstance from './axiosInstance';

/**
 * Get all products with optional filters
 */
export const getProducts = async (params = {}) => {
  return await axiosInstance.get('/products', { params });
};

/**
 * Get a single product by ID
 */
export const getProductById = async (id) => {
  return await axiosInstance.get(`/products/${id}`);
};

/**
 * Search products
 */
export const searchProducts = async (query, filters = {}) => {
  return await axiosInstance.get('/products/search', {
    params: { q: query, ...filters },
  });
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async (limit = 6) => {
  return await axiosInstance.get('/products/featured', {
    params: { limit },
  });
};

/**
 * Get product reviews
 */
export const getProductReviews = async (productId, page = 1, limit = 10) => {
  return await axiosInstance.get(`/products/${productId}/reviews`, {
    params: { page, limit },
  });
};

/**
 * Add product review
 */
export const addProductReview = async (productId, reviewData) => {
  return await axiosInstance.post(
    `/products/${productId}/reviews`,
    reviewData
  );
};

/**
 * Get product categories
 */
export const getCategories = async () => {
  return await axiosInstance.get('/products/categories');
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (categoryId, params = {}) => {
  return await axiosInstance.get(
    `/products/category/${categoryId}`,
    { params }
  );
};

/**
 * Check product availability
 */
export const checkProductAvailability = async (productId, quantity) => {
  return await axiosInstance.get(
    `/products/${productId}/availability`,
    { params: { quantity } }
  );
};

/**
 * Get related products
 */
export const getRelatedProducts = async (productId, limit = 4) => {
  return await axiosInstance.get(
    `/products/${productId}/related`,
    { params: { limit } }
  );
};
