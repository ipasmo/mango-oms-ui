import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useProductStore from '@store/productStore';

const Products = () => {
  const { t } = useTranslation();
  const { products, isLoading } = useProductStore();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          {t('products.title')}
        </h1>
        <p className="text-xl text-gray-600">
          {t('products.subtitle')}
        </p>
        
        {isLoading ? (
          <p>{t('common.loading')}</p>
        ) : products.length === 0 ? (
          <p>{t('products.noProducts')}</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
};

export default Products;