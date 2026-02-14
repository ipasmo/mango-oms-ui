// Add these imports at the top
import LanguageSwitcher from '@components/common/LanguageSwitcher';
import CurrencySwitcher from '@components/common/CurrencySwitcher';
import { useTranslation } from 'react-i18next';

// In the Navbar component, add this:
const Navbar = () => {
  const { t } = useTranslation();
  // ... existing code ...
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            🥭 {t('common.appName', 'Mango OMS')}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/products">{t('nav.products')}</Link>
            <Link to="/about">{t('nav.about')}</Link>
            <Link to="/contact">{t('nav.contact')}</Link>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Currency Switcher */}
            <CurrencySwitcher />
            
            {/* Cart */}
            <button onClick={() => setIsCartOpen(true)}>
              {/* ... existing cart code ... */}
            </button>
            
            {/* ... rest of navbar ... */}
          </div>
        </div>
      </div>
    </nav>
  );
};