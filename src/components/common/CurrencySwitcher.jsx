import React, { useState } from 'react';
import { IoCashOutline, IoChevronDownOutline } from 'react-icons/io5';
import { CURRENCIES } from '@utils/constants';
import clsx from 'clsx';

const CurrencySwitcher = () => {
  const [currentCurrency, setCurrentCurrency] = useState('USD');
  const [isOpen, setIsOpen] = useState(false);
  
  const handleCurrencyChange = (code) => {
    setCurrentCurrency(code);
    localStorage.setItem('currency', code);
    setIsOpen(false);
    // Trigger re-render of prices across the app
    window.dispatchEvent(new CustomEvent('currencyChanged', { detail: code }));
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Change currency"
        aria-expanded={isOpen}
      >
        <IoCashOutline className="w-5 h-5 text-gray-700" />
        <span className="text-sm font-medium text-gray-700">
          {CURRENCIES[currentCurrency]?.symbol} {currentCurrency}
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
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-20 py-2 animate-fade-in">
            {Object.entries(CURRENCIES).map(([code, { symbol, name }]) => (
              <button
                key={code}
                onClick={() => handleCurrencyChange(code)}
                className={clsx(
                  'w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 transition-colors',
                  currentCurrency === code && 'bg-primary-50 text-primary-600'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{symbol}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{code}</span>
                    <span className="text-xs text-gray-500">{name}</span>
                  </div>
                </div>
                {currentCurrency === code && (
                  <span className="text-primary-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencySwitcher;