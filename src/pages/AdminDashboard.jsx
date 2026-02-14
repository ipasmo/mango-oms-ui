import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '@store/authStore';
import useOrderStore from '@store/orderStore';
import useProductStore from '@store/productStore';
import { StatsCard, OrderChart, SpendingChart } from '@components/dashboard';
import { Spinner } from '@components/common';
import {
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const { isAdmin } = useAuthStore();
  const { orders, fetchOrders, fetchOrderStats, orderStats, isLoading } = useOrderStore();
  const { fetchProducts, products } = useProductStore();

  const [recentUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', joinedAt: new Date() },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinedAt: new Date() },
  ]);

  useEffect(() => {
    document.title = 'Admin Dashboard - Mango OMS';
    
    // Check if user is admin
    if (!isAdmin()) {
      window.location.href = '/dashboard';
      return;
    }

    fetchOrders();
    fetchOrderStats('30days');
    fetchProducts();
  }, [isAdmin, fetchOrders, fetchOrderStats, fetchProducts]);

  const recentOrders = orders.slice(0, 10);
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalUsers = 248; // Mock data
  const totalProducts = products.length || 45;

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: UsersIcon,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'Total Orders',
      value: orders.length,
      icon: ShoppingBagIcon,
      color: 'bg-green-500',
      change: '+18%',
      trend: 'up',
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: CurrencyDollarIcon,
      color: 'bg-yellow-500',
      change: '+23%',
      trend: 'up',
    },
    {
      title: 'Total Products',
      value: totalProducts,
      icon: CubeIcon,
      color: 'bg-purple-500',
      change: '+5%',
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
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor and manage your Mango OMS system
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Analytics</h2>
            <OrderChart data={orderStats} />
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Overview</h2>
            <SpendingChart data={orderStats} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
              <Link to="/admin/orders" className="text-yellow-600 hover:text-yellow-700 font-medium">
                View All
              </Link>
            </div>

            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Order #{order.id || order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(order.total || 0).toFixed(2)}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status || 'pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No orders yet</p>
            )}
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Users</h2>
              <Link to="/admin/users" className="text-yellow-600 hover:text-yellow-700 font-medium">
                View All
              </Link>
            </div>

            {recentUsers.length > 0 ? (
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <UsersIcon className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {new Date(user.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No users yet</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Link
            to="/admin/products"
            className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <CubeIcon className="w-8 h-8 mb-2" />
            <h3 className="text-lg font-bold mb-1">Manage Products</h3>
            <p className="text-blue-50 text-sm">Add, edit, or remove products</p>
          </Link>
          <Link
            to="/admin/orders"
            className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <ShoppingBagIcon className="w-8 h-8 mb-2" />
            <h3 className="text-lg font-bold mb-1">View Orders</h3>
            <p className="text-green-50 text-sm">Manage customer orders</p>
          </Link>
          <Link
            to="/admin/users"
            className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <UsersIcon className="w-8 h-8 mb-2" />
            <h3 className="text-lg font-bold mb-1">Manage Users</h3>
            <p className="text-purple-50 text-sm">View and manage users</p>
          </Link>
          <Link
            to="/admin/analytics"
            className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-bold mb-1">Analytics</h3>
            <p className="text-yellow-50 text-sm">View detailed analytics</p>
          </Link>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl p-6 shadow-lg mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">System Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Database</span>
                <span className="text-green-600 font-medium">Healthy</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">API Response</span>
                <span className="text-green-600 font-medium">Fast</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Storage</span>
                <span className="text-yellow-600 font-medium">Medium</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
