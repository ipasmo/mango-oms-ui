import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useProductStore from '@store/productStore';
import { ProductGrid, ProductFilters, SearchBar } from '@components/product';
import { Spinner } from '@components/common';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    products,
    categories,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalProducts,
    filters,
    setPage,
    setFilters,
    fetchProducts,
    fetchCategories,
  } = useProductStore();

  const [showFilters, setShowFilters] = useState(false);

  // Initial load - fetch products and categories on mount
  useEffect(() => {
    document.title = 'Products - Mango OMS';
    fetchProducts();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update filters when URL params change
  useEffect(() => {
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const minPrice = searchParams.get('minPrice') || null;
    const maxPrice = searchParams.get('maxPrice') || null;
    const sortBy = searchParams.get('sortBy') || 'featured';

    setFilters({
      category,
      search,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      sortBy,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const handleSearch = (query) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('search', query);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleFilterChange = (newFilters) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== null && value !== '' && value !== undefined) {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
    });
    
    setSearchParams(newParams);
  };

  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-gray-600">
            Explore our wide selection of premium quality mangoes
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} value={searchParams.get('search') || ''} />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <ProductFilters 
              categories={categories}
              filters={{
                category: searchParams.get('category') || '',
                minPrice: parseInt(searchParams.get('minPrice')) || 0,
                maxPrice: parseInt(searchParams.get('maxPrice')) || 1000,
                sortBy: searchParams.get('sortBy') || 'featured',
              }}
              onChange={handleFilterChange}
            />
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Results Summary */}
            {!isLoading && !error && (
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">
                  Showing {products.length > 0 ? ((currentPage - 1) * 12) + 1 : 0} - {Math.min(currentPage * 12, totalProducts)} of {totalProducts} products
                </p>
              </div>
            )}

            {/* Product Grid with loading and error states */}
            <ProductGrid 
              products={products}
              loading={isLoading}
              error={!!error}
              errorMessage={error || 'Failed to load products'}
              emptyMessage="No products found"
            />

            {/* Pagination */}
            {!isLoading && !error && products.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2" aria-label="Pagination">
                      {/* Previous Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Previous page"
                      >
                        <ChevronLeftIcon className="w-5 h-5" />
                      </button>

                      {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((page) => {
                          const distance = Math.abs(page - currentPage);
                          return distance === 0 || distance === 1 || page === 1 || page === totalPages;
                        })
                        .map((page, index, array) => {
                          const showEllipsis = index > 0 && array[index - 1] !== page - 1;
                          return (
                            <div key={page} className="flex items-center">
                              {showEllipsis && (
                                <span className="px-2 text-gray-500">...</span>
                              )}
                              <button
                                onClick={() => handlePageChange(page)}
                                className={`px-4 py-2 border rounded-lg transition-colors ${
                                  currentPage === page
                                    ? 'bg-yellow-500 text-white border-yellow-500'
                                    : 'border-gray-300 hover:bg-gray-50'
                                }`}
                                aria-label={`Page ${page}`}
                                aria-current={currentPage === page ? 'page' : undefined}
                              >
                                {page}
                              </button>
                            </div>
                          );
                        })}

                      {/* Next Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Next page"
                      >
                        <ChevronRightIcon className="w-5 h-5" />
                      </button>
                    </nav>
                  </div>
                )}
          </main>
        </div>
      </div>
    </div>
  );
}
