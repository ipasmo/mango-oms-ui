import React, { useEffect, useState } from 'react';
import {
  IoCartOutline,
  IoCheckmarkCircleOutline,
  IoPeopleOutline,
  IoCashOutline,
} from 'react-icons/io5';
import StatsCard from '@components/dashboard/StatsCard';
import Card from '@components/common/Card';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  
  useEffect(() => {
    // Fetch admin stats from API
    // For now, using mock data
    setStats({
      totalOrders: 1234,
      completedOrders: 987,
      totalUsers: 456,
      totalRevenue: 45678.90,
    });
  }, []);
  
  const statsData = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: IoCartOutline,
      color: 'primary',
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Completed',
      value: stats.completedOrders,
      icon: IoCheckmarkCircleOutline,
      color: 'success',
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: IoPeopleOutline,
      color: 'info',
      trend: { value: 15, isPositive: true },
    },
    {
      title: 'Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: IoCashOutline,
      color: 'warning',
      trend: { value: 20, isPositive: true },
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
        
        <Card>
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <p className="text-gray-600">Admin features coming soon...</p>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;