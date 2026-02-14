import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import useDebounce from '@hooks/useDebounce';
import useProductStore from '@store/productStore';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const setFilters = useProductStore((state) => state.setFilters);
  
  // Debounce search to avoid excessive API calls
  useDebounce(
    () => {
      setFilters({ search: searchTerm });
    },
    [searchTerm],
    500
  );
  
  return (
    <div className="relative max-w-xl w-full">
      <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search for mangoes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        aria-label="Search products"
      />
    </div>
  );
};

export default SearchBar;