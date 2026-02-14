import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoCartOutline,
  IoCheckmarkCircleOutline,
  IoCashOutline,
  IoTrendingUpOutline,
} from 'react-icons/io5';
import useAuthStore from '@store/authStore';
import useOrderStore from '@store/orderStore';
import StatsCard from '@components/dashboard/StatsCard';
import OrderChart from '@components/dashboard/OrderChart';
import SpendingChart from '@components/dashboard/SpendingChart';
import OrderCard from '@components/order/OrderCard';
import Spinner from '@components/common/Spinner';
import Button from '@components/common/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { orders, orderStats, fetchOrders, fetchOrderStats, isLoading } = useOrderStore();
  
  useEffect(() => {
    fetchOrders({ limit: 5 });
    fetchOrderStats();
  }, [fetchOrders, fetchOrderStats]);
  
  const stats = [
    {
      title: 'Total Orders',
      value: orderStats?.totalOrders || 0,
      icon: IoCartOutline,
      color: 'primary',
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Completed',
      value: orderStats?.completedOrders || 0,
      icon: IoCheckmarkCircleOutline,
      color: 'success',
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Total Spent',
      value: `$${orderStats?.totalSpent?.toFixed(2) || '0.00'}`,
      icon: IoCashOutline,
      color: 'info',
      trend: { value: 15, isPositive: true },
    },
    {
      title: 'This Month',
      value: orderStats?.thisMonth || 0,
      icon: IoTrendingUpOutline,
      color: 'warning',
      trend: { value: 20, isPositive: true },
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600">
            Here's what's happening with your orders
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <OrderChart data={orderStats?.ordersByMonth} />
          <SpendingChart data={orderStats?.spendingByMonth} />
        </div>
        
        {/* Recent Orders */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-semibold text-gray-900">
              Recent Orders
            </h2>
            <Button
              variant="outline"
              onClick={() => navigate('/orders')}
            >
              View All
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <IoCartOutline className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-4">No orders yet</p>
              <Button onClick={() => navigate('/products')}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.slice(0, 3).map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;