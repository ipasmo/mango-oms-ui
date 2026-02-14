import React from 'react';
import useProductStore from '@store/productStore';
import Button from '@components/common/Button';

const ProductFilters = () => {
  const { filters, setFilters, resetFilters } = useProductStore();
  
  const varieties = ['Alphonso', 'Kesar', 'Dasheri', 'Langra', 'Totapuri', 'Badami'];
  
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-display font-semibold text-gray-900">
          Filters
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
        >
          Reset
        </Button>
      </div>
      
      {/* Variety Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Variety</h4>
        <div className="space-y-2">
          {varieties.map((variety) => (
            <label key={variety} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="variety"
                checked={filters.variety === variety}
                onChange={() => setFilters({ variety })}
                className="w-4 h-4 text-primary-500 focus:ring-primary-500"
              />
              <span className="ml-2 text-gray-700">{variety}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h4>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Min Price</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters({ minPrice: Number(e.target.value) })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Max Price</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
      
      {/* Availability */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Availability</h4>
        <select
          value={filters.availability}
          onChange={(e) => setFilters({ availability: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Products</option>
          <option value="in_stock">In Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;