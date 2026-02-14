import React from 'react';
import { IoTrashOutline, IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import useCartStore from '@store/cartStore';
import { formatCurrency } from '@utils/formatters';
import Button from '@components/common/Button';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  
  const handleIncrement = () => {
    updateQuantity(item.product.id, item.lotSize, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.lotSize, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeItem(item.product.id, item.lotSize);
  };
  
  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0">
      {/* Product Image */}
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded-lg"
        loading="lazy"
      />
      
      {/* Product Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          Lot Size: <span className="font-medium">{item.lotSize}</span>
        </p>
        <p className="text-lg font-semibold text-primary-600">
          {formatCurrency(item.price)}
        </p>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 p-2 transition-colors"
          aria-label="Remove item"
        >
          <IoTrashOutline className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={handleDecrement}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            aria-label="Decrease quantity"
            disabled={item.quantity <= 1}
          >
            <IoRemoveOutline className="w-4 h-4" />
          </button>
          
          <span className="px-4 font-semibold text-gray-900 min-w-[2rem] text-center">
            {item.quantity}
          </span>
          
          <button
            onClick={handleIncrement}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            aria-label="Increase quantity"
          >
            <IoAddOutline className="w-4 h-4" />
          </button>
        </div>
        
        {/* Item Total */}
        <p className="text-lg font-bold text-gray-900">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;