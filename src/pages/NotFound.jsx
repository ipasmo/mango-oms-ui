import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '404 - Page Not Found | Mango OMS';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-yellow-500 mb-4 animate-bounce">
            404
          </div>
          <div className="text-6xl mb-4">🥭</div>
        </div>

        {/* Error Message */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            The page you&apos;re looking for seems to have gone missing. It might have been moved, deleted, or the URL might be incorrect.
          </p>
          
          {/* Helpful Suggestions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
            <p className="font-semibold text-gray-900 mb-2">Here are some helpful links:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="mr-2">🏠</span>
                <Link to="/" className="text-yellow-600 hover:text-yellow-700 hover:underline">
                  Go to Homepage
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🛍️</span>
                <Link to="/products" className="text-yellow-600 hover:text-yellow-700 hover:underline">
                  Browse Products
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📦</span>
                <Link to="/orders" className="text-yellow-600 hover:text-yellow-700 hover:underline">
                  View Your Orders
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mr-2">👤</span>
                <Link to="/profile" className="text-yellow-600 hover:text-yellow-700 hover:underline">
                  Go to Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Go Back
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors shadow-md hover:shadow-lg"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="text-gray-600 text-sm">
          <p className="mb-2">
            💡 <strong>Fun Fact:</strong> Did you know that mangoes are one of the most popular fruits in the world?
          </p>
          <p>
            While you&apos;re here, why not explore our collection of premium mangoes!
          </p>
        </div>

        {/* Support Link */}
        <div className="mt-8">
          <p className="text-gray-600 mb-2">Still can&apos;t find what you&apos;re looking for?</p>
          <Link
            to="/contact"
            className="text-yellow-600 hover:text-yellow-700 font-medium hover:underline"
          >
            Contact our support team
          </Link>
        </div>
      </div>
    </div>
  );
}
