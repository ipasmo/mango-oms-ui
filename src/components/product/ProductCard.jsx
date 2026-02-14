import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import useCartStore from '@store/cartStore';
import { formatCurrency } from '@utils/formatters';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  
  const handleAddToCart = (e, lotSize) => {
    e.stopPropagation();
    addItem(product, lotSize, 1);
  };
  
  const isAvailable = product.stock > 0;
  
  return (
    <Card
      hover
      padding="none"
      className="group"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Badge */}
        {!isAvailable && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Out of Stock
          </div>
        )}
        
        {product.featured && (
          <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Prices */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">3kg</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(product.prices?.['3kg'] || 0)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">5kg</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(product.prices?.['5kg'] || 0)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">10kg</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(product.prices?.['10kg'] || 0)}
            </span>
          </div>
        </div>
        
        {/* Add to Cart */}
        <div className="flex gap-2">
          <Button
            size="sm"
            fullWidth
            disabled={!isAvailable}
            onClick={(e) => handleAddToCart(e, '3kg')}
            className="text-xs"
          >
            <IoCartOutline className="w-4 h-4 mr-1" />
            3kg
          </Button>
          <Button
            size="sm"
            fullWidth
            disabled={!isAvailable}
            onClick={(e) => handleAddToCart(e, '5kg')}
            className="text-xs"
          >
            <IoCartOutline className="w-4 h-4 mr-1" />
            5kg
          </Button>
          <Button
            size="sm"
            fullWidth
            disabled={!isAvailable}
            onClick={(e) => handleAddToCart(e, '10kg')}
            className="text-xs"
          >
            <IoCartOutline className="w-4 h-4 mr-1" />
            10kg
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;