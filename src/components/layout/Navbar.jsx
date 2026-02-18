import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '@utils/helpers';
import useAuth from '@hooks/useAuth';
import useCart from '@hooks/useCart';
import LanguageSwitcher from '@components/common/LanguageSwitcher';

/**
 * Navbar Component
 * Responsive navigation bar with cart, user menu, and language switcher
 */
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount, toggleCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/orders', label: 'Orders' },
  ];

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    await logout();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center hover:opacity-80 transition-opacity py-2"
            aria-label="Mango OMS Home"
          >
            <img src="/images/logo_5.png" alt="Mango OMS" className="h-24 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Cart Icon with Badge */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  aria-label={`${itemCount} items in cart`}
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary-600 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {isAuthenticated && user && (
                  <span className="text-sm font-medium">{user.name}</span>
                )}
                <svg
                  className={cn(
                    'w-4 h-4 transition-transform',
                    isUserMenuOpen && 'transform rotate-180'
                  )}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 border border-gray-200"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="py-1">
                      {isAuthenticated ? (
                        <>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                            role="menuitem"
                          >
                            Profile
                          </Link>
                          <Link
                            to="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                            role="menuitem"
                          >
                            Settings
                          </Link>
                          <hr className="my-1 border-gray-200" />
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            role="menuitem"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                            role="menuitem"
                          >
                            Login
                          </Link>
                          <Link
                            to="/signup"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                            role="menuitem"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-2 pt-2">
            {/* Mobile Navigation Links */}
            <div className="space-y-1 mb-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'block px-4 py-2 rounded-lg font-medium transition-colors',
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="space-y-3 px-4">
              {/* Cart Button */}
              <button
                onClick={() => {
                  toggleCart();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-primary-600 transition-colors"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <span className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Cart</span>
                </span>
                {itemCount > 0 && (
                  <span className="bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              {/* Language Switcher */}
              <div className="py-2">
                <LanguageSwitcher className="w-full" />
              </div>

              {/* User Actions */}
              <div className="pt-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
