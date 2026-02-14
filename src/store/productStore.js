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
      
      const params = {
        page: currentPage,
        limit: pageSize,
        ...filters,
      };
      
      const data = await productApi.getProducts(params);
      
      set({
        products: data.products || data,
        totalPages: data.totalPages || 1,
        totalProducts: data.total || data.length,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  // Fetch featured products
  fetchFeaturedProducts: async (limit = 6) => {
    try {
      const data = await productApi.getFeaturedProducts(limit);
      set({ featuredProducts: data.products || data });
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
    }
  },

  // Fetch single product
  fetchProductById: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await productApi.getProductById(id);
      set({
        currentProduct: data.product || data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  // Search products
  searchProducts: async (query) => {
    set({ isLoading: true, error: null });
    
    try {
      const { filters } = get();
      const data = await productApi.searchProducts(query, filters);
      
      set({
        products: data.products || data,
        totalPages: data.totalPages || 1,
        totalProducts: data.total || data.length,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  // Fetch categories
  fetchCategories: async () => {
    try {
      const data = await productApi.getCategories();
      set({ categories: data.categories || data });
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
