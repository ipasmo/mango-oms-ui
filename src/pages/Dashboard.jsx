import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '@store/authStore';
import useOrderStore from '@store/orderStore';
import { StatsCard, OrderChart, SpendingChart } from '@components/dashboard';
import { Spinner } from '@components/common';
import {
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ClockIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { orders, fetchOrders, fetchOrderStats, orderStats, isLoading } = useOrderStore();

  useEffect(() => {
    document.title = 'Dashboard - Mango OMS';
    fetchOrders();
    fetchOrderStats('30days');
  }, [fetchOrders, fetchOrderStats]);

  const recentOrders = orders.slice(0, 5);

  // Calculate stats from orders
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending' || order.status === 'processing').length;
  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingBagIcon,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent.toFixed(2)}`,
      icon: CurrencyDollarIcon,
      color: 'bg-green-500',
      change: '+8%',
      trend: 'up',
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      icon: ClockIcon,
      color: 'bg-yellow-500',
      change: '-5%',
      trend: 'down',
    },
    {
      title: 'Delivered',
      value: deliveredOrders,
      icon: TruckIcon,
      color: 'bg-purple-500',
      change: '+15%',
      trend: 'up',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your orders today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Trends</h2>
            <OrderChart data={orderStats} />
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Spending Overview</h2>
            <SpendingChart data={orderStats} />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
            <Link
              to="/orders"
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              View All
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id || order.orderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ${(order.total || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          to={`/orders/${order.id}`}
                          className="text-yellow-600 hover:text-yellow-700 font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">You haven&apos;t placed any orders yet</p>
              <Link
                to="/products"
                className="inline-block px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link
            to="/products"
            className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <ShoppingBagIcon className="w-8 h-8 mb-2" />
            <h3 className="text-lg font-bold mb-1">Browse Products</h3>
            <p className="text-yellow-50 text-sm">Explore our mango selection</p>
          </Link>
          <Link
            to="/orders"
            className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <TruckIcon className="w-8 h-8 mb-2" />
            <h3 className="text-lg font-bold mb-1">Track Orders</h3>
            <p className="text-blue-50 text-sm">View your order history</p>
          </Link>
          <Link
            to="/profile"
            className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h3 className="text-lg font-bold mb-1">My Profile</h3>
            <p className="text-purple-50 text-sm">Manage your account</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
