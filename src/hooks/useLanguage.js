import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@utils/constants';

/**
 * Custom hook for language management
 * Provides language state and switching functionality
 */
const useLanguage = () => {
  const { i18n, t } = useTranslation();

  // Get current language
  const currentLanguage = i18n.language;

  // Get current language details
  const getCurrentLanguage = () => {
    const langCode = currentLanguage.split('-')[0]; // Handle en-US -> en
    return LANGUAGES[langCode.toUpperCase()] || LANGUAGES.EN;
  };

  // Change language
  const changeLanguage = async (languageCode) => {
    try {
      await i18n.changeLanguage(languageCode);
      localStorage.setItem('language', languageCode);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  // Get all available languages
  const getAvailableLanguages = () => {
    return Object.values(LANGUAGES);
  };

  // Check if language is RTL (right-to-left)
  const isRTL = () => {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    return rtlLanguages.includes(currentLanguage.split('-')[0]);
  };

  // Get direction for HTML
  const getDirection = () => {
    return isRTL() ? 'rtl' : 'ltr';
  };

  return {
    // Current language
    currentLanguage,
    currentLanguageDetails: getCurrentLanguage(),
    
    // Actions
    changeLanguage,
    
    // Query methods
    availableLanguages: getAvailableLanguages(),
    isRTL: isRTL(),
    direction: getDirection(),
    
    // Translation function
    t,
  };
};

export default useLanguage;
