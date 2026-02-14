import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { IoMailOutline, IoLockClosedOutline, IoPersonOutline, IoCallOutline } from 'react-icons/io5';
import useAuthStore from '@store/authStore';
import { signupValidation } from '@/validations/authValidation';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Card from '@components/common/Card';

const Signup = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const [error, setError] = useState('');
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError('');
      await register(values);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join us and start ordering premium mangoes</p>
        </div>
        
        <Card>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              phone: '',
              terms: false,
            }}
            validationSchema={signupValidation}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" role="alert">
                    {error}
                  </div>
                )}
                
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="John Doe"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                  touched={touched.name}
                  icon={<IoPersonOutline className="w-5 h-5 text-gray-400" />}
                  required
                />
                
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                  icon={<IoMailOutline className="w-5 h-5 text-gray-400" />}
                  required
                />
                
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="+1 (234) 567-890"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.phone}
                  touched={touched.phone}
                  icon={<IoCallOutline className="w-5 h-5 text-gray-400" />}
                  required
                />
                
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touched={touched.password}
                  icon={<IoLockClosedOutline className="w-5 h-5 text-gray-400" />}
                  required
                />
                
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  icon={<IoLockClosedOutline className="w-5 h-5 text-gray-400" />}
                  required
                />
                
                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={values.terms}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {touched.terms && errors.terms && (
                    <p className="mt-2 text-sm text-red-600">{errors.terms}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
                
                <p className="text-center text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Login
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default Signup;