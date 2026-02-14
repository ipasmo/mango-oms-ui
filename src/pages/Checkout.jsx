import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import useCartStore from '@store/cartStore';
import useOrderStore from '@store/orderStore';
import { checkoutValidation } from '@/validations/orderValidation';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import { formatCurrency } from '@utils/formatters';
import { toast } from 'react-toastify';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  
  const subtotal = getTotal();
  const tax = subtotal * 0.18;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;
  
  const initialValues = {
    shippingAddress: {
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'USA',
    },
    paymentMethod: 'credit_card',
  };
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.product.id,
          lotSize: item.lotSize,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: values.shippingAddress,
        paymentMethod: values.paymentMethod,
        subtotal,
        tax,
        shipping,
        total,
      };
      
      const order = await createOrder(orderData);
      clearCart();
      navigate(`/orders/${order.id}`);
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">
          Checkout
        </h1>
        
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutValidation}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Shipping Address */}
                  <Card>
                    <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                      Shipping Address
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        name="shippingAddress.fullName"
                        value={values.shippingAddress.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.shippingAddress?.fullName}
                        touched={touched.shippingAddress?.fullName}
                        required
                      />
                      <Input
                        label="Phone Number"
                        name="shippingAddress.phone"
                        type="tel"
                        value={values.shippingAddress.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.shippingAddress?.phone}
                        touched={touched.shippingAddress?.phone}
                        required
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="Address Line 1"
                          name="shippingAddress.addressLine1"
                          value={values.shippingAddress.addressLine1}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.shippingAddress?.addressLine1}
                          touched={touched.shippingAddress?.addressLine1}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          label="Address Line 2"
                          name="shippingAddress.addressLine2"
                          value={values.shippingAddress.addressLine2}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <Input
                        label="City"
                        name="shippingAddress.city"
                        value={values.shippingAddress.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.shippingAddress?.city}
                        touched={touched.shippingAddress?.city}
                        required
                      />
                      <Input
                        label="State/Province"
                        name="shippingAddress.state"
                        value={values.shippingAddress.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.shippingAddress?.state}
                        touched={touched.shippingAddress?.state}
                        required
                      />
                      <Input
                        label="Postal Code"
                        name="shippingAddress.postalCode"
                        value={values.shippingAddress.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.shippingAddress?.postalCode}
                        touched={touched.shippingAddress?.postalCode}
                        required
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="shippingAddress.country"
                          value={values.shippingAddress.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="USA">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="India">India</option>
                        </select>
                      </div>
                    </div>
                  </Card>
                  
                  {/* Payment Method */}
                  <Card>
                    <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                      Payment Method
                    </h2>
                    <div className="space-y-3">
                      {[
                        { value: 'credit_card', label: 'Credit Card' },
                        { value: 'debit_card', label: 'Debit Card' },
                        { value: 'upi', label: 'UPI' },
                        { value: 'net_banking', label: 'Net Banking' },
                        { value: 'cod', label: 'Cash on Delivery' },
                      ].map((method) => (
                        <label
                          key={method.value}
                          className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors"
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.value}
                            checked={values.paymentMethod === method.value}
                            onChange={handleChange}
                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-3 text-gray-900 font-medium">
                            {method.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </Card>
                </div>
                
                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                      Order Summary
                    </h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({items.length} items)</span>
                        <span>{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax (18% GST)</span>
                        <span>{formatCurrency(tax)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>
                          {shipping === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            formatCurrency(shipping)
                          )}
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      Place Order
                    </Button>
                  </Card>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Checkout;