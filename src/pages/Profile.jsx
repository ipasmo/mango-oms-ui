import React from 'react';
import { Formik, Form } from 'formik';
import useAuthStore from '@store/authStore';
import { profileValidation } from '@/validations/authValidation';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Card from '@components/common/Card';

const Profile = () => {
  const { user, updateProfile } = useAuthStore();
  
  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  };
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateProfile(values);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">
          My Profile
        </h1>
        
        <Card>
          <Formik
            initialValues={initialValues}
            validationSchema={profileValidation}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form className="space-y-6">
                <Input
                  label="Full Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                  touched={touched.name}
                  required
                />
                
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                  disabled
                  required
                />
                
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.phone}
                  touched={touched.phone}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {touched.address && errors.address && (
                    <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Update Profile
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default Profile;