import React, { useEffect } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '@store/orderStore';
import OrderCard from '@components/order/OrderCard';
import Spinner from '@components/common/Spinner';
import Button from '@components/common/Button';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { orders, fetchOrders, isLoading } = useOrderStore();
  
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" text="Loading orders..." />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">
          Order History
        </h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <IoCartOutline className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No Orders Yet
            </h2>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your order history.
            </p>
            <Button onClick={() => navigate('/products')}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;