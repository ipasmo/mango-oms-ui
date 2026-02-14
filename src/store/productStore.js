import { create } from 'zustand';
import { productApi } from '@api/productApi';

const useProductStore = create((set, get) => ({
  products: [],
  featuredProducts: [],
  currentProduct: null,
  filters: {
    search: '',
    variety: '',
    minPrice: 0,
    maxPrice: 1000,
    availability: 'all',
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
  isLoading: false,
  
  // Fetch products
  fetchProducts: async (params = {}) => {
    set({ isLoading: true });
    try {
      const data = await productApi.getProducts({
        ...get().filters,
        ...params,
        page: get().pagination.page,
        limit: get().pagination.limit,
      });
      
      set({
        products: data.products,
        pagination: { ...get().pagination, total: data.total },
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  // Fetch featured products
  fetchFeaturedProducts: async () => {
    try {
      const data = await productApi.getFeaturedProducts();
      set({ featuredProducts: data });
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
    }
  },
  
  // Fetch single product
  fetchProductById: async (id) => {
    set({ isLoading: true });
    try {
      const product = await productApi.getProductById(id);
      set({ currentProduct: product, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  // Set filters
  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters }, pagination: { ...get().pagination, page: 1 } });
  },
  
  // Set page
  setPage: (page) => {
    set({ pagination: { ...get().pagination, page } });
  },
  
  // Reset filters
  resetFilters: () => {
    set({
      filters: {
        search: '',
        variety: '',
        minPrice: 0,
        maxPrice: 1000,
        availability: 'all',
      },
      pagination: { page: 1, limit: 12, total: 0 },
    });
  },
}));

export default useProductStore;