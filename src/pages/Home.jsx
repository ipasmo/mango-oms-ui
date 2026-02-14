import React from 'react';
import Hero from '@components/home/Hero';
import FeaturedProducts from '@components/home/FeaturedProducts';
import { useNavigate } from 'react-router-dom';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import {
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoLeafOutline,
  IoTrophyOutline,
} from 'react-icons/io5';

const Home = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: IoLeafOutline,
      title: 'Farm Fresh',
      description: 'Directly from our organic farms to ensure maximum freshness and quality',
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      icon: IoRocketOutline,
      title: 'Fast Delivery',
      description: 'Get your mangoes delivered within 24-48 hours of order placement',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      icon: IoShieldCheckmarkOutline,
      title: 'Quality Assured',
      description: 'Every batch is carefully inspected to meet our high standards',
      color: 'text-primary-600',
      bg: 'bg-primary-100',
    },
    {
      icon: IoTrophyOutline,
      title: 'Premium Varieties',
      description: 'Choose from the finest mango varieties including Alphonso and Kesar',
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
    },
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering the best mango experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                hover
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Order Premium Mangoes?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Browse our selection and get fresh mangoes delivered to your doorstep
          </p>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/products')}
            className="bg-white text-primary-600 hover:bg-gray-100 border-white"
          >
            Start Shopping
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;