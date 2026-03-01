import { create } from 'zustand';
import * as productApi from '@api/productApi';

/**
 * Product Store
 * Manages product catalog state and filters
 */
const useProductStore = create((set, get) => ({
  // State
  products: [],
  featuredProducts: [],
  currentProduct: null,
  categories: [],
  isLoading: false,
  error: null,
  
  // Pagination
  currentPage: 1,
  pageSize: 12,
  totalPages: 1,
  totalProducts: 0,
  
  // Filters
  filters: {
    search: '',
    category: '',
    minPrice: null,
    maxPrice: null,
    sortBy: 'name',
    sortOrder: 'asc',
  },

  // Fetch products with filters
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const { currentPage, pageSize, filters } = get();
      
      // Convert frontend sortBy format to backend format
      let sortBy = 'name';
      let sortOrder = 'asc';
      
      if (filters.sortBy) {
        switch(filters.sortBy) {
          case 'featured':
            sortBy = 'featured';
            sortOrder = 'desc';
            break;
          case 'price-low':
            sortBy = 'prices.3kg';
            sortOrder = 'asc';
            break;
          case 'price-high':
            sortBy = 'prices.3kg';
            sortOrder = 'desc';
            break;
          case 'name-asc':
            sortBy = 'name';
            sortOrder = 'asc';
            break;
          case 'name-desc':
            sortBy = 'name';
            sortOrder = 'desc';
            break;
          default:
            sortBy = filters.sortBy;
            sortOrder = 'asc';
        }
      }
      
      const params = {
        page: currentPage,
        limit: pageSize,
        category: filters.category || undefined,
        search: filters.search || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        sortBy,
        sortOrder,
      };
      
      // Remove undefined values
      Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
      
      const response = await productApi.getProducts(params);
      const data = response.data || response; // Handle successResponse wrapper
      
      // Transform MongoDB _id to id for React keys
      const productsList = data.products || [];
      const products = Array.isArray(productsList) ? productsList.map(product => ({
        ...product,
        id: product.id || product._id,
      })) : [];
      
      set({
        products,
        totalPages: data.pagination?.pages || 1,
        totalProducts: data.pagination?.total || products.length,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({
        error: error.response?.data?.error?.message || error.message || 'Failed to load products',
        isLoading: false,
        products: [],
      });
    }
  },

  // Fetch featured products
  fetchFeaturedProducts: async (limit = 6) => {
    try {
      const response = await productApi.getFeaturedProducts(limit);
      const data = response.data || response; // Handle successResponse wrapper
      // Transform MongoDB _id to id
      const productsList = data.products || [];
      const products = Array.isArray(productsList) ? productsList.map(product => ({
        ...product,
        id: product.id || product._id,
      })) : [];
      set({ featuredProducts: products });
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
    }
  },

  // Fetch single product
  fetchProductById: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await productApi.getProductById(id);
      const data = response.data || response; // Handle successResponse wrapper
      const product = data.product || data;
      // Transform MongoDB _id to id
      const transformedProduct = {
        ...product,
        id: product.id || product._id,
      };
      set({
        currentProduct: transformedProduct,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      set({
        error: error.response?.data?.error?.message || error.message || 'Failed to load product',
        isLoading: false,
      });
    }
  },

  // Search products
  searchProducts: async (query) => {
    set({ isLoading: true, error: null });
    
    try {
      const { filters } = get();
      const response = await productApi.searchProducts(query, filters);
      const data = response.data || response; // Handle successResponse wrapper
      
      // Transform MongoDB _id to id
      const productsList = data.products || [];
      const products = Array.isArray(productsList) ? productsList.map(product => ({
        ...product,
        id: product.id || product._id,
      })) : [];
      
      set({
        products,
        totalPages: data.pagination?.pages || 1,
        totalProducts: data.count || data.pagination?.total || products.length,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error searching products:', error);
      set({
        error: error.response?.data?.error?.message || error.message || 'Failed to search products',
        isLoading: false,
        products: [],
      });
    }
  },

  // Fetch categories
  fetchCategories: async () => {
    try {
      const response = await productApi.getCategories();
      const data = response.data || response; // Handle successResponse wrapper
      set({ categories: data.categories || [] });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  },

  // Update filters
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1, // Reset to first page when filters change
    }));
    get().fetchProducts();
  },

  // Reset filters
  resetFilters: () => {
    set({
      filters: {
        search: '',
        category: '',
        minPrice: null,
        maxPrice: null,
        sortBy: 'name',
        sortOrder: 'asc',
      },
      currentPage: 1,
    });
    get().fetchProducts();
  },

  // Set page
  setPage: (page) => {
    set({ currentPage: page });
    get().fetchProducts();
  },

  // Set page size
  setPageSize: (size) => {
    set({ pageSize: size, currentPage: 1 });
    get().fetchProducts();
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Clear current product
  clearCurrentProduct: () => set({ currentProduct: null }),
}));

export default useProductStore;
