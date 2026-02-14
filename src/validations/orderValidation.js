import * as Yup from 'yup';

export const checkoutValidation = Yup.object({
  shippingAddress: Yup.object({
    fullName: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Full name is required'),
    phone: Yup.string()
      .matches(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number')
      .required('Phone number is required'),
    addressLine1: Yup.string()
      .min(5, 'Address must be at least 5 characters')
      .required('Address is required'),
    addressLine2: Yup.string(),
    city: Yup.string()
      .min(2, 'City must be at least 2 characters')
      .required('City is required'),
    state: Yup.string()
      .min(2, 'State must be at least 2 characters')
      .required('State is required'),
    postalCode: Yup.string()
      .matches(/^\d{5,6}$/, 'Invalid postal code')
      .required('Postal code is required'),
    country: Yup.string()
      .required('Country is required'),
  }),
  paymentMethod: Yup.string()
    .oneOf(['credit_card', 'debit_card', 'upi', 'net_banking', 'cod'])
    .required('Payment method is required'),
});

export const paymentValidation = Yup.object({
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, 'Card number must be 16 digits')
    .required('Card number is required'),
  cardHolder: Yup.string()
    .min(3, 'Cardholder name must be at least 3 characters')
    .required('Cardholder name is required'),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY')
    .required('Expiry date is required'),
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
    .required('CVV is required'),
});