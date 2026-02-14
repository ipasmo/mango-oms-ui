import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { IoClose, IoCartOutline } from 'react-icons/io5';
import useCartStore from '@store/cartStore';
import CartItem from './CartItem';
import Button from '@components/common/Button';
import { formatCurrency } from '@utils/formatters';

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { items, getTotal, getItemCount } = useCartStore();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const handleCheckout = () => {
    onClose();
    navigate('/cart');
  };
  
  if (!isOpen) return null;
  
  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <IoCartOutline className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-display font-semibold text-gray-900">
              Shopping Cart
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        
        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <IoCartOutline className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Button onClick={() => { onClose(); navigate('/products'); }}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.lotSize}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 bg-gray-50">
            <div className="flex justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">
                Subtotal ({getItemCount()} items)
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(getTotal())}
              </span>
            </div>
            <Button fullWidth size="lg" onClick={handleCheckout}>
              View Cart & Checkout
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default CartDrawer;