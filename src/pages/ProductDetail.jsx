import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProductStore from '@store/productStore';
import useCartStore from '@store/cartStore';
import { Spinner } from '@components/common';
import { ProductGrid } from '@components/product';
import {
  StarIcon,
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const lotSizes = [
  { value: 3, label: '3 kg', discount: 0 },
  { value: 5, label: '5 kg', discount: 5 },
  { value: 10, label: '10 kg', discount: 10 },
  { value: 20, label: '20 kg', discount: 15 },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { currentProduct, fetchProductById, isLoading, error, clearCurrentProduct, fetchProducts } = useProductStore();
  const { addItem, openCart } = useCartStore();
  
  const [selectedLotSize, setSelectedLotSize] = useState(3);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetchProductById(id);
    fetchProducts();
    
    return () => clearCurrentProduct();
  }, [id, fetchProductById, fetchProducts, clearCurrentProduct]);

  useEffect(() => {
    if (currentProduct) {
      document.title = `${currentProduct.name} - Mango OMS`;
      
      // Mock related products (in real app, fetch from API)
      setRelatedProducts([]);
    }
  }, [currentProduct]);

  const handleAddToCart = () => {
    try {
      addItem(currentProduct, quantity, selectedLotSize);
      openCart();
    } catch (err) {
      alert(err.message);
    }
  };

  const calculatePrice = () => {
    if (!currentProduct) return 0;
    const lotConfig = lotSizes.find(lot => lot.value === selectedLotSize);
    const discount = lotConfig?.discount || 0;
    return currentProduct.price * (1 - discount / 100);
  };

  const calculateTotal = () => {
    return calculatePrice() * quantity;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Link to="/products" className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = currentProduct.images || [currentProduct.image];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li><Link to="/" className="hover:text-yellow-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-yellow-600">Products</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{currentProduct.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-4">
              <img
                src={images[selectedImage]}
                alt={currentProduct.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-yellow-500' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${currentProduct.name} ${index + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentProduct.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  i < Math.floor(currentProduct.rating || 4.5) ? (
                    <StarIconSolid key={i} className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
                  )
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {currentProduct.rating || 4.5} ({currentProduct.reviewCount || 42} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-yellow-600">
                  ${calculatePrice().toFixed(2)}
                </span>
                <span className="ml-2 text-gray-500">per kg</span>
              </div>
              {lotSizes.find(lot => lot.value === selectedLotSize)?.discount > 0 && (
                <p className="text-sm text-green-600 mt-1">
                  Save {lotSizes.find(lot => lot.value === selectedLotSize)?.discount}% on this lot size!
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {currentProduct.description}
            </p>

            {/* Lot Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Lot Size
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {lotSizes.map((lot) => (
                  <button
                    key={lot.value}
                    onClick={() => setSelectedLotSize(lot.value)}
                    className={`px-4 py-3 border-2 rounded-lg font-medium transition-colors ${
                      selectedLotSize === lot.value
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-gray-300 hover:border-yellow-300'
                    }`}
                  >
                    <div>{lot.label}</div>
                    {lot.discount > 0 && (
                      <div className="text-xs text-green-600">-{lot.discount}%</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Total Price:</span>
                <span className="text-2xl font-bold text-yellow-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg mb-4"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2 text-gray-700">
                <TruckIcon className="w-5 h-5 text-yellow-600" />
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <ShieldCheckIcon className="w-5 h-5 text-yellow-600" />
                <span className="text-sm">Quality Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mb-12 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="text-center py-8 text-gray-500">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </div>
  );
}
