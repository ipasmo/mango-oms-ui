import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute';

// Lazy load pages for code splitting
const Home = lazy(() => import('@pages/Home'));
const Products = lazy(() => import('@pages/Products'));
const ProductDetail = lazy(() => import('@pages/ProductDetail'));
const Cart = lazy(() => import('@pages/Cart'));
const Checkout = lazy(() => import('@pages/Checkout'));
const Login = lazy(() => import('@pages/Login'));
const Signup = lazy(() => import('@pages/Signup'));
const Dashboard = lazy(() => import('@pages/Dashboard'));
const OrderHistory = lazy(() => import('@pages/OrderHistory'));
const Profile = lazy(() => import('@pages/Profile'));
const NotFound = lazy(() => import('@pages/NotFound'));

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      
      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;