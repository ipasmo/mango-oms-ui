import * as Yup from 'yup';

/**
 * Checkout address validation schema
 */
export const checkoutAddressSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters')
    .max(100, 'Full name must be at most 100 characters')
    .required('Full name is required'),
  street: Yup.string()
    .min(5, 'Street address must be at least 5 characters')
    .max(200, 'Street address must be at most 200 characters')
    .required('Street address is required'),
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be at most 100 characters')
    .required('City is required'),
  state: Yup.string()
    .min(2, 'State must be at least 2 characters')
    .max(100, 'State must be at most 100 characters')
    .required('State is required'),
  zipCode: Yup.string()
    .matches(/^[0-9]{5,10}$/, 'Invalid ZIP code')
    .required('ZIP code is required'),
  country: Yup.string()
    .min(2, 'Country must be at least 2 characters')
    .max(100, 'Country must be at most 100 characters')
    .required('Country is required'),
  phone: Yup.string()
    .matches(/^\+?[\d\s\-()]{10,}$/, 'Invalid phone number')
    .required('Phone number is required'),
});

/**
 * Payment validation schema
 */
export const paymentSchema = Yup.object().shape({
  paymentMethod: Yup.string()
    .oneOf(['card', 'paypal', 'cod'], 'Invalid payment method')
    .required('Payment method is required'),
  cardNumber: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema
      .matches(/^[0-9]{16}$/, 'Card number must be 16 digits')
      .required('Card number is required'),
    otherwise: (schema) => schema,
  }),
  cardName: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema
      .min(3, 'Cardholder name must be at least 3 characters')
      .required('Cardholder name is required'),
    otherwise: (schema) => schema,
  }),
  expiryDate: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)')
      .required('Expiry date is required'),
    otherwise: (schema) => schema,
  }),
  cvv: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema
      .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits')
      .required('CVV is required'),
    otherwise: (schema) => schema,
  }),
});

/**
 * Order notes validation schema
 */
export const orderNotesSchema = Yup.object().shape({
  notes: Yup.string()
    .max(500, 'Notes must be at most 500 characters'),
});
