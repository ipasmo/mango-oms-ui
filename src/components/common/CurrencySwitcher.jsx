import { useState } from 'react';
import { CURRENCIES } from '@utils/constants';
import { cn } from '@utils/helpers';

/**
 * Currency Switcher Component
 * Dropdown to switch between available currencies
 */
const CurrencySwitcher = ({ className, onCurrencyChange }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES.USD);
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
    
    if (onCurrencyChange) {
      onCurrencyChange(currency);
    }
  };

  const currencies = Object.values(CURRENCIES);

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Select currency"
        aria-expanded={isOpen}
      >
        <span className="font-semibold">{selectedCurrency.symbol}</span>
        <span>{selectedCurrency.code}</span>
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
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencyChange(currency)}
                  className={cn(
                    'flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors',
                    selectedCurrency.code === currency.code &&
                      'bg-primary-50 text-primary-700'
                  )}
                >
                  <span className="font-semibold w-6">{currency.symbol}</span>
                  <span className="flex-1">{currency.name}</span>
                  <span className="text-gray-500">{currency.code}</span>
                  {selectedCurrency.code === currency.code && (
                    <svg
                      className="w-4 h-4 text-primary-600"
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

export default CurrencySwitcher;
