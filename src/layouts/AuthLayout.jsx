import { Outlet } from 'react-router-dom';

/**
 * Auth Layout
 * Minimal layout for authentication pages (login, signup)
 */
const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient">
            🥭 Mango OMS
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Fresh mangoes delivered to your door
          </p>
        </div>
        
        {/* Auth Content */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <Outlet />
        </div>
        
        {/* Footer Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          © 2024 Mango OMS. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
