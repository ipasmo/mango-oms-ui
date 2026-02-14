import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

/**
 * Custom hook for language management
 * @returns {Object} Language utilities
 */
const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);
  
  const changeLanguage = async (lng) => {
    try {
      await i18n.changeLanguage(lng);
      setCurrentLanguage(lng);
      localStorage.setItem('i18nextLng', lng);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  ];
  
  return {
    t,
    currentLanguage,
    changeLanguage,
    languages,
    isRTL: i18n.dir() === 'rtl',
  };
};

export default useLanguage;