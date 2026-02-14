import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoCartOutline, IoArrowBackOutline, IoStarOutline } from 'react-icons/io5';
import useProductStore from '@store/productStore';
import useCartStore from '@store/cartStore';
import Button from '@components/common/Button';
import Spinner from '@components/common/Spinner';
import { formatCurrency } from '@utils/formatters';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentProduct, fetchProductById, isLoading } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedLotSize, setSelectedLotSize] = useState('3kg');
  
  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);
  
  const handleAddToCart = () => {
    if (currentProduct) {
      addItem(currentProduct, selectedLotSize, 1);
    }
  };
  
  if (isLoading) {
    return <Spinner fullScreen />;
  }
  
  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }
  
  const isAvailable = currentProduct.stock > 0;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors"
        >
          <IoArrowBackOutline className="w-5 h-5" />
          Back to Products
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl p-8 shadow-card">
          {/* Product Image */}
          <div className="aspect-square rounded-xl overflow-hidden">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              {currentProduct.featured && (
                <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  Featured
                </span>
              )}
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
                {currentProduct.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <IoStarOutline key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8/5 - 124 reviews)</span>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {currentProduct.description}
            </p>
            
            {/* Lot Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Select Lot Size
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {['3kg', '5kg', '10kg'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedLotSize(size)}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      selectedLotSize === size
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{size}</p>
                      <p className="text-lg font-bold text-primary-600">
                        {formatCurrency(currentProduct.prices?.[size] || 0)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Stock Status */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isAvailable ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className={isAvailable ? 'text-green-700' : 'text-red-700'}>
                  {isAvailable ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <Button
              size="lg"
              fullWidth
              disabled={!isAvailable}
              onClick={handleAddToCart}
              className="mb-4"
            >
              <IoCartOutline className="w-6 h-6 mr-2" />
              Add to Cart - {formatCurrency(currentProduct.prices?.[selectedLotSize] || 0)}
            </Button>
            
            {/* Product Details */}
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Product Details
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between">
                  <span className="font-medium">Variety:</span>
                  <span>{currentProduct.variety || 'Premium'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Origin:</span>
                  <span>Farm Fresh</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Delivery:</span>
                  <span>24-48 hours</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Storage:</span>
                  <span>Cool, dry place</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;