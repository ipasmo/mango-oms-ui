import { useState } from 'react';
import useLanguage from '@hooks/useLanguage';
import { cn } from '@utils/helpers';

/**
 * Language Switcher Component
 * Dropdown to switch between available languages
 */
const LanguageSwitcher = ({ className }) => {
  const { currentLanguageDetails, availableLanguages, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-xl">{currentLanguageDetails.flag}</span>
        <span>{currentLanguageDetails.code.toUpperCase()}</span>
        <svg
          className={cn(
            'w-4 h-4 transition-transform',
            isOpen && 'transform rotate-180'
          )}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 border border-gray-200">
            <div className="py-1">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    'flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors',
                    currentLanguageDetails.code === lang.code &&
                      'bg-primary-50 text-primary-700'
                  )}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {currentLanguageDetails.code === lang.code && (
                    <svg
                      className="ml-auto w-4 h-4 text-primary-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
