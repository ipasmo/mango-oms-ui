import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { checkoutAddressSchema, paymentSchema } from '@validations/orderValidation';
import useCartStore from '@store/cartStore';
import useOrderStore from '@store/orderStore';
import useAuthStore from '@store/authStore';
import { Spinner } from '@components/common';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const steps = [
  { id: 1, name: 'Shipping Address' },
  { id: 2, name: 'Payment Method' },
  { id: 3, name: 'Review Order' },
];

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { createOrder, isLoading } = useOrderStore();
  const { user, isAuthenticated } = useAuthStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    document.title = 'Checkout - Mango OMS';
    
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }

    // Redirect to cart if empty
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [isAuthenticated, items, navigate]);

  const handleShippingSubmit = (values) => {
    setShippingData(values);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (values) => {
    setPaymentData(values);
    setCurrentStep(3);
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          lotSize: item.lotSize,
          price: item.price,
        })),
        shippingAddress: shippingData,
        paymentMethod: paymentData.paymentMethod,
        paymentDetails: paymentData.paymentMethod === 'card' ? {
          cardNumber: paymentData.cardNumber,
          cardName: paymentData.cardName,
          expiryDate: paymentData.expiryDate,
        } : null,
        total: getTotal(),
      };

      const result = await createOrder(orderData);
      clearCart();
      navigate('/order-confirmation', { state: { order: result.order || result } });
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  if (!isAuthenticated || items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep >= step.id
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircleIcon className="w-6 h-6" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <p
                    className={`mt-2 text-sm font-medium ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 ${
                      currentStep > step.id ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              {/* Step 1: Shipping Address */}
              {currentStep === 1 && (
                <Formik
                  initialValues={{
                    fullName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: '',
                    phone: user?.phone || '',
                  }}
                  validationSchema={checkoutAddressSchema}
                  onSubmit={handleShippingSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>

                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <Field
                          id="fullName"
                          name="fullName"
                          type="text"
                          className={`w-full px-3 py-2 border ${
                            errors.fullName && touched.fullName ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                        />
                        {errors.fullName && touched.fullName && (
                          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <Field
                          id="street"
                          name="street"
                          type="text"
                          className={`w-full px-3 py-2 border ${
                            errors.street && touched.street ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                        />
                        {errors.street && touched.street && (
                          <p className="mt-1 text-sm text-red-600">{errors.street}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <Field
                            id="city"
                            name="city"
                            type="text"
                            className={`w-full px-3 py-2 border ${
                              errors.city && touched.city ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                          />
                          {errors.city && touched.city && (
                            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State/Province
                          </label>
                          <Field
                            id="state"
                            name="state"
                            type="text"
                            className={`w-full px-3 py-2 border ${
                              errors.state && touched.state ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                          />
                          {errors.state && touched.state && (
                            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code
                          </label>
                          <Field
                            id="zipCode"
                            name="zipCode"
                            type="text"
                            className={`w-full px-3 py-2 border ${
                              errors.zipCode && touched.zipCode ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                          />
                          {errors.zipCode && touched.zipCode && (
                            <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                          </label>
                          <Field
                            id="country"
                            name="country"
                            type="text"
                            className={`w-full px-3 py-2 border ${
                              errors.country && touched.country ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                          />
                          {errors.country && touched.country && (
                            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Field
                          id="phone"
                          name="phone"
                          type="tel"
                          className={`w-full px-3 py-2 border ${
                            errors.phone && touched.phone ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                        />
                        {errors.phone && touched.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Continue to Payment
                      </button>
                    </Form>
                  )}
                </Formik>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <Formik
                  initialValues={{
                    paymentMethod: 'card',
                    cardNumber: '',
                    cardName: '',
                    expiryDate: '',
                    cvv: '',
                  }}
                  validationSchema={paymentSchema}
                  onSubmit={handlePaymentSubmit}
                >
                  {({ errors, touched, values }) => (
                    <Form className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>

                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <label
                            key={method.id}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              values.paymentMethod === method.id
                                ? 'border-yellow-500 bg-yellow-50'
                                : 'border-gray-300 hover:border-yellow-300'
                            }`}
                          >
                            <Field
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              className="w-4 h-4 text-yellow-500 focus:ring-yellow-500"
                            />
                            <span className="ml-3 text-2xl">{method.icon}</span>
                            <span className="ml-3 font-medium text-gray-900">{method.name}</span>
                          </label>
                        ))}
                      </div>

                      {values.paymentMethod === 'card' && (
                        <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <Field
                              id="cardNumber"
                              name="cardNumber"
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className={`w-full px-3 py-2 border ${
                                errors.cardNumber && touched.cardNumber ? 'border-red-300' : 'border-gray-300'
                              } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                            />
                            {errors.cardNumber && touched.cardNumber && (
                              <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                              Cardholder Name
                            </label>
                            <Field
                              id="cardName"
                              name="cardName"
                              type="text"
                              placeholder="John Doe"
                              className={`w-full px-3 py-2 border ${
                                errors.cardName && touched.cardName ? 'border-red-300' : 'border-gray-300'
                              } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                            />
                            {errors.cardName && touched.cardName && (
                              <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <Field
                                id="expiryDate"
                                name="expiryDate"
                                type="text"
                                placeholder="MM/YY"
                                className={`w-full px-3 py-2 border ${
                                  errors.expiryDate && touched.expiryDate ? 'border-red-300' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                              />
                              {errors.expiryDate && touched.expiryDate && (
                                <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <Field
                                id="cvv"
                                name="cvv"
                                type="text"
                                placeholder="123"
                                className={`w-full px-3 py-2 border ${
                                  errors.cvv && touched.cvv ? 'border-red-300' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                              />
                              {errors.cvv && touched.cvv && (
                                <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                        >
                          Review Order
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>

                  {/* Shipping Address Review */}
                  <div className="border-b pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-700">{shippingData?.fullName}</p>
                    <p className="text-gray-700">{shippingData?.street}</p>
                    <p className="text-gray-700">
                      {shippingData?.city}, {shippingData?.state} {shippingData?.zipCode}
                    </p>
                    <p className="text-gray-700">{shippingData?.country}</p>
                    <p className="text-gray-700">{shippingData?.phone}</p>
                  </div>

                  {/* Payment Method Review */}
                  <div className="border-b pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-700">
                      {paymentMethods.find(m => m.id === paymentData?.paymentMethod)?.name}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.lotSize}`} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">Lot: {item.lotSize} kg × {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isLoading}
                      className="flex-1 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isLoading ? <Spinner size="small" /> : 'Place Order'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.lotSize}`} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} ({item.lotSize}kg) × {item.quantity}
                    </span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-yellow-600 text-xl">${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
