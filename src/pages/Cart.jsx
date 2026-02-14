import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import useCartStore from '@store/cartStore';
import CartItem from '@components/cart/CartItem';
import CartSummary from '@components/cart/CartSummary';
import Button from '@components/common/Button';

const Cart = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <IoCartOutline className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any mangoes to your cart yet.
          </p>
          <Button size="lg" onClick={() => navigate('/products')}>
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-card">
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                Cart Items ({items.length})
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={`${item.product.id}-${item.lotSize}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;