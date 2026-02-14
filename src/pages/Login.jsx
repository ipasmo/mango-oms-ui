import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { IoMailOutline, IoLockClosedOutline } from 'react-icons/io5';
import useAuthStore from '@store/authStore';
import { loginValidation } from '@/validations/authValidation';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Card from '@components/common/Card';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState('');
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError('');
      await login(values);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Login to your account to continue</p>
        </div>
        
        <Card>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidation}
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
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Login
                </Button>
                
                <p className="text-center text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Sign up
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

export default Login;