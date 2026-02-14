import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '@store/cartStore';
import { formatCurrency } from '@utils/formatters';
import Button from '@components/common/Button';
import Card from '@components/common/Card';

const CartSummary = () => {
  const navigate = useNavigate();
  const { items, getTotal, getItemCount } = useCartStore();
  
  const subtotal = getTotal();
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;
  
  return (
    <Card>
      <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
        Order Summary
      </h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({getItemCount()} items)</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Tax (18% GST)</span>
          <span className="font-medium">{formatCurrency(tax)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              formatCurrency(shipping)
            )}
          </span>
        </div>
        
        {subtotal < 500 && subtotal > 0 && (
          <p className="text-sm text-primary-600 bg-primary-50 p-3 rounded-lg">
            Add {formatCurrency(500 - subtotal)} more for FREE shipping!
          </p>
        )}
      </div>
      
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between text-xl font-bold text-gray-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
      
      <Button
        fullWidth
        size="lg"
        disabled={items.length === 0}
        onClick={() => navigate('/checkout')}
      >
        Proceed to Checkout
      </Button>
      
      <button
        onClick={() => navigate('/products')}
        className="w-full mt-4 text-primary-600 hover:text-primary-700 font-medium transition-colors"
      >
        Continue Shopping
      </button>
    </Card>
  );
};

export default CartSummary;