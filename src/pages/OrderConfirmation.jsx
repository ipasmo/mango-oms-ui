import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, TruckIcon, MapPinIcon } from '@heroicons/react/24/solid';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    document.title = 'Order Confirmed - Mango OMS';
    
    // Redirect if no order data
    if (!order) {
      navigate('/orders');
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="bg-white rounded-xl p-8 shadow-lg text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-700">
                Order Number: <span className="font-bold text-yellow-600">#{order.id || order.orderNumber || 'ORD' + Date.now()}</span>
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image || '/placeholder-product.jpg'} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Lot: {item.lotSize} kg × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${(order.total || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span className="text-yellow-600">${(order.total || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Tracking Info */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h2>
            
            <div className="space-y-6">
              {/* Estimated Delivery */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TruckIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Estimated Delivery</h3>
                  <p className="text-gray-600">
                    {estimatedDelivery.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Shipping Address</h3>
                  <div className="text-gray-600">
                    {order.shippingAddress ? (
                      <>
                        <p>{order.shippingAddress.fullName}</p>
                        <p>{order.shippingAddress.street}</p>
                        <p>
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                        <p>{order.shippingAddress.phone}</p>
                      </>
                    ) : (
                      <p>Address information not available</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Tracking Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  📧 <strong>Email Sent:</strong> A confirmation email with tracking information has been sent to your email address.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/orders"
              className="flex-1 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors text-center shadow-md hover:shadow-lg"
            >
              View Order History
            </Link>
            <Link
              to="/products"
              className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">Need help with your order?</p>
            <Link to="/contact" className="text-yellow-600 hover:text-yellow-700 font-medium">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
