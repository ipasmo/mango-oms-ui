import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import Button from '@components/common/Button';
import Card from '@components/common/Card';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full text-center">
        <IoCheckmarkCircleOutline className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Your order has been confirmed. We'll send you a confirmation email shortly.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-600 mb-1">Order ID</p>
          <p className="text-2xl font-bold text-gray-900">#{orderId}</p>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            fullWidth
            onClick={() => navigate(`/orders/${orderId}`)}
          >
            View Order Details
          </Button>
          <Button
            fullWidth
            variant="outline"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OrderConfirmation;