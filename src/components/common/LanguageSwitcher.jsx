import React, { useState } from 'react';
import { IoLanguageOutline, IoChevronDownOutline } from 'react-icons/io5';
import useLanguage from '@hooks/useLanguage';
import clsx from 'clsx';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLang = languages.find((lang) => lang.code === currentLanguage);
  
  const handleLanguageChange = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <IoLanguageOutline className="w-5 h-5 text-gray-700" />
        <span className="text-sm font-medium text-gray-700">
          {currentLang?.flag} {currentLang?.code.toUpperCase()}
        </span>
        <IoChevronDownOutline
          className={clsx(
            'w-4 h-4 text-gray-700 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20 py-2 animate-fade-in">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors',
                  currentLanguage === lang.code && 'bg-primary-50 text-primary-600'
                )}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
                {currentLanguage === lang.code && (
                  <span className="ml-auto text-primary-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;