import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { profileUpdateSchema, passwordChangeSchema } from '@validations/authValidation';
import useAuthStore from '@store/authStore';
import { Spinner } from '@components/common';
import { UserCircleIcon, KeyIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Profile() {
  const { user, updateProfile, changePassword, isLoading, error, clearError } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    document.title = 'My Profile - Mango OMS';
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleProfileSubmit = async (values, { setSubmitting }) => {
    try {
      await updateProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      });
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Profile update failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      setSuccessMessage('Password changed successfully!');
      resetForm();
    } catch (err) {
      console.error('Password change failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile Information', icon: UserCircleIcon },
    { id: 'password', name: 'Change Password', icon: KeyIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              My Profile
            </h1>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              <p className="text-sm">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-yellow-500 text-yellow-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 md:p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Profile Information
                  </h2>

                  <Formik
                    initialValues={{
                      firstName: user?.firstName || '',
                      lastName: user?.lastName || '',
                      phone: user?.phone || '',
                    }}
                    validationSchema={profileUpdateSchema}
                    onSubmit={handleProfileSubmit}
                    enableReinitialize
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form className="space-y-6">
                        {/* Email (Read-only) */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Email cannot be changed
                          </p>
                        </div>

                        {/* First Name */}
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <Field
                            id="firstName"
                            name="firstName"
                            type="text"
                            className={`w-full px-3 py-2 border ${
                              errors.firstName && touched.firstName ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                          />
                          {errors.firstName && touched.firstName && (
                            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                          )}
                        </div>

                        {/* Last Name */}
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <Field
                            id="lastName"
                            name="lastName"
                            type="text"
                            className={`w-full px-3 py-2 border ${
                              errors.lastName && touched.lastName ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                          />
                          {errors.lastName && touched.lastName && (
                            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                          )}
                        </div>

                        {/* Phone */}
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

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting || isLoading}
                          className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {isSubmitting || isLoading ? (
                            <Spinner size="small" />
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Change Password
                  </h2>

                  <Formik
                    initialValues={{
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    }}
                    validationSchema={passwordChangeSchema}
                    onSubmit={handlePasswordSubmit}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form className="space-y-6">
                        {/* Current Password */}
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <Field
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            className={`w-full px-3 py-2 border ${
                              errors.currentPassword && touched.currentPassword ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                            placeholder="••••••••"
                          />
                          {errors.currentPassword && touched.currentPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                          )}
                        </div>

                        {/* New Password */}
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <Field
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            className={`w-full px-3 py-2 border ${
                              errors.newPassword && touched.newPassword ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                            placeholder="••••••••"
                          />
                          {errors.newPassword && touched.newPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                          )}
                        </div>

                        {/* Confirm New Password */}
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <Field
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className={`w-full px-3 py-2 border ${
                              errors.confirmPassword && touched.confirmPassword ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                            placeholder="••••••••"
                          />
                          {errors.confirmPassword && touched.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                          )}
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm font-medium text-blue-900 mb-2">Password Requirements:</p>
                          <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                            <li>At least 8 characters long</li>
                            <li>Contains at least one uppercase letter</li>
                            <li>Contains at least one lowercase letter</li>
                            <li>Contains at least one number</li>
                            <li>Contains at least one special character</li>
                          </ul>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting || isLoading}
                          className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {isSubmitting || isLoading ? (
                            <Spinner size="small" />
                          ) : (
                            'Change Password'
                          )}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
