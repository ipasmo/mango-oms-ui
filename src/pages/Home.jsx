import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hero, FeaturedProducts } from '@components/home';
import useProductStore from '@store/productStore';
import { Spinner } from '@components/common';
import { 
  TruckIcon, 
  ShieldCheckIcon, 
  CurrencyDollarIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

const benefits = [
  {
    icon: TruckIcon,
    title: 'Fast Delivery',
    description: 'Get your fresh mangoes delivered within 24-48 hours'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Quality Guaranteed',
    description: '100% fresh and quality mangoes or your money back'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Best Prices',
    description: 'Competitive wholesale prices direct from farms'
  },
  {
    icon: ClockIcon,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for your convenience'
  }
];

export default function Home() {
  const { fetchFeaturedProducts, featuredProducts, isLoading } = useProductStore();

  useEffect(() => {
    document.title = 'Mango OMS - Premium Quality Mangoes';
    fetchFeaturedProducts(6);
  }, [fetchFeaturedProducts]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our selection of premium quality mangoes, sourced fresh from the finest farms
            </p>
          </div>

          <FeaturedProducts 
            products={featuredProducts}
            loading={isLoading}
          />

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors shadow-md hover:shadow-lg"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the best mango shopping experience with quality products and excellent service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Order Fresh Mangoes?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers enjoying premium quality mangoes delivered to their doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-3 bg-white text-yellow-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
            >
              Shop Now
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors shadow-md hover:shadow-lg"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
