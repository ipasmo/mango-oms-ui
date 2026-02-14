import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useProductStore from '@store/productStore';
import ProductCard from '@components/product/ProductCard';
import Spinner from '@components/common/Spinner';
import Button from '@components/common/Button';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { featuredProducts, fetchFeaturedProducts, isLoading } = useProductStore();
  
  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);
  
  if (isLoading) {
    return (
      <div className="py-20">
        <Spinner size="lg" text="Loading featured products..." />
      </div>
    );
  }
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Featured Mangoes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular varieties, handpicked for exceptional taste and quality
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/products')}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;