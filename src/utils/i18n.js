import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Common
      common: {
        loading: 'Loading...',
        error: 'An error occurred',
        success: 'Success',
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        search: 'Search',
        filter: 'Filter',
        reset: 'Reset',
        submit: 'Submit',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
      },
      
      // Navigation
      nav: {
        home: 'Home',
        products: 'Products',
        about: 'About',
        contact: 'Contact',
        cart: 'Cart',
        dashboard: 'Dashboard',
        orders: 'Orders',
        profile: 'Profile',
        login: 'Login',
        signup: 'Sign Up',
        logout: 'Logout',
      },
      
      // Authentication
      auth: {
        welcomeBack: 'Welcome Back',
        loginSubtitle: 'Login to your account to continue',
        createAccount: 'Create Account',
        signupSubtitle: 'Join us and start ordering premium mangoes',
        email: 'Email Address',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        name: 'Full Name',
        phone: 'Phone Number',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        noAccount: "Don't have an account?",
        hasAccount: 'Already have an account?',
        loginButton: 'Login',
        signupButton: 'Sign Up',
        loginSuccess: 'Login successful!',
        signupSuccess: 'Account created successfully!',
        logoutSuccess: 'Logged out successfully',
        loginError: 'Login failed. Please check your credentials.',
        signupError: 'Signup failed. Please try again.',
      },
      
      // Products
      products: {
        title: 'Our Products',
        subtitle: 'Browse our premium selection of fresh mangoes',
        searchPlaceholder: 'Search for mangoes...',
        featured: 'Featured',
        outOfStock: 'Out of Stock',
        inStock: 'In Stock',
        addToCart: 'Add to Cart',
        viewDetails: 'View Details',
        filters: 'Filters',
        variety: 'Variety',
        priceRange: 'Price Range',
        minPrice: 'Min Price',
        maxPrice: 'Max Price',
        availability: 'Availability',
        allProducts: 'All Products',
        sortBy: 'Sort By',
        noProducts: 'No products found',
        tryAdjustFilters: 'Try adjusting your filters',
      },
      
      // Cart
      cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty',
        startShopping: 'Start Shopping',
        itemAdded: '{{name}} added to cart',
        itemRemoved: 'Item removed from cart',
        cartUpdated: 'Cart updated',
        subtotal: 'Subtotal',
        tax: 'Tax (GST)',
        shipping: 'Shipping',
        total: 'Total',
        freeShipping: 'FREE',
        freeShippingMessage: 'Add {{amount}} more for FREE shipping!',
        proceedToCheckout: 'Proceed to Checkout',
        continueShopping: 'Continue Shopping',
        removeItem: 'Remove item',
        updateQuantity: 'Update quantity',
        lotSize: 'Lot Size',
      },
      
      // Checkout
      checkout: {
        title: 'Checkout',
        shippingAddress: 'Shipping Address',
        paymentMethod: 'Payment Method',
        orderSummary: 'Order Summary',
        placeOrder: 'Place Order',
        fullName: 'Full Name',
        addressLine1: 'Address Line 1',
        addressLine2: 'Address Line 2',
        city: 'City',
        state: 'State',
        postalCode: 'Postal Code',
        country: 'Country',
        creditCard: 'Credit Card',
        debitCard: 'Debit Card',
        upi: 'UPI',
        netBanking: 'Net Banking',
        cod: 'Cash on Delivery',
        orderPlaced: 'Order placed successfully!',
        orderError: 'Failed to place order. Please try again.',
      },
      
      // Orders
      orders: {
        title: 'My Orders',
        orderId: 'Order ID',
        date: 'Date',
        status: 'Status',
        total: 'Total',
        items: 'Items',
        deliveryTo: 'Delivery to',
        noOrders: 'No orders yet',
        startShoppingButton: 'Start Shopping',
        viewOrder: 'View Order',
        cancelOrder: 'Cancel Order',
        orderCancelled: 'Order cancelled successfully',
        downloadInvoice: 'Download Invoice',
        trackOrder: 'Track Order',
        orderDetails: 'Order Details',
        shippingDetails: 'Shipping Details',
        paymentDetails: 'Payment Details',
        orderTimeline: 'Order Timeline',
        statusPending: 'Pending',
        statusProcessing: 'Processing',
        statusShipped: 'Shipped',
        statusDelivered: 'Delivered',
        statusCancelled: 'Cancelled',
      },
      
      // Dashboard
      dashboard: {
        welcome: 'Welcome back, {{name}}!',
        subtitle: "Here's what's happening with your orders",
        totalOrders: 'Total Orders',
        completedOrders: 'Completed',
        totalSpent: 'Total Spent',
        thisMonth: 'This Month',
        recentOrders: 'Recent Orders',
        viewAll: 'View All',
        ordersOverview: 'Orders Overview',
        spendingTrends: 'Spending Trends',
        statistics: 'Statistics',
        analytics: 'Analytics',
      },
      
      // Profile
      profile: {
        title: 'My Profile',
        personalInfo: 'Personal Information',
        updateProfile: 'Update Profile',
        changePassword: 'Change Password',
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        profileUpdated: 'Profile updated successfully',
        passwordChanged: 'Password changed successfully',
        address: 'Address',
        preferences: 'Preferences',
      },
      
      // Home
      home: {
        heroTitle: 'Premium Mangoes',
        heroSubtitle: 'Delivered Fresh',
        heroDescription: 'Experience the sweetest mangoes from our farm to your doorstep. Available in 3kg, 5kg, and 10kg carton lots.',
        shopNow: 'Shop Now',
        learnMore: 'Learn More',
        whyChooseUs: 'Why Choose Us?',
        whyChooseUsSubtitle: "We're committed to delivering the best mango experience",
        featuredProducts: 'Featured Mangoes',
        featuredSubtitle: 'Discover our most popular varieties, handpicked for exceptional taste and quality',
        viewAllProducts: 'View All Products',
        ctaTitle: 'Ready to Order Premium Mangoes?',
        ctaSubtitle: 'Browse our selection and get fresh mangoes delivered to your doorstep',
        startShopping: 'Start Shopping',
        farmFresh: 'Farm Fresh',
        farmFreshDesc: 'Directly from our organic farms to ensure maximum freshness and quality',
        fastDelivery: 'Fast Delivery',
        fastDeliveryDesc: 'Get your mangoes delivered within 24-48 hours of order placement',
        qualityAssured: 'Quality Assured',
        qualityAssuredDesc: 'Every batch is carefully inspected to meet our high standards',
        premiumVarieties: 'Premium Varieties',
        premiumVarietiesDesc: 'Choose from the finest mango varieties including Alphonso and Kesar',
      },
      
      // Footer
      footer: {
        description: 'Premium quality mangoes delivered fresh from our farms to your doorstep. Experience the sweetest varieties in convenient carton lots.',
        quickLinks: 'Quick Links',
        customerService: 'Customer Service',
        contactUs: 'Contact Us',
        shippingInfo: 'Shipping Info',
        returns: 'Returns & Refunds',
        terms: 'Terms & Conditions',
        privacy: 'Privacy Policy',
        faq: 'FAQ',
        cookies: 'Cookies',
        rights: 'All rights reserved.',
      },
      
      // Validation
      validation: {
        required: '{{field}} is required',
        invalidEmail: 'Invalid email address',
        passwordMin: 'Password must be at least 8 characters',
        passwordLowercase: 'Must contain lowercase letter',
        passwordUppercase: 'Must contain uppercase letter',
        passwordNumber: 'Must contain number',
        passwordSpecial: 'Must contain special character',
        passwordMatch: 'Passwords must match',
        invalidPhone: 'Invalid phone number',
        invalidPostalCode: 'Invalid postal code',
        minLength: '{{field}} must be at least {{min}} characters',
        maxLength: '{{field}} must be less than {{max}} characters',
        acceptTerms: 'You must accept the terms and conditions',
      },
      
      // Errors
      errors: {
        somethingWrong: 'Oops! Something went wrong',
        tryAgain: 'Please try refreshing the page',
        networkError: 'Network error. Please check your connection',
        unauthorized: 'Access denied',
        notFound: 'Resource not found',
        serverError: 'Server error. Please try again later',
        tooManyRequests: 'Too many requests. Please try again later',
        pageNotFound: 'Page Not Found',
        pageNotFoundDesc: 'The page you are looking for does not exist.',
        goHome: 'Go Home',
      },
    },
  },
  
  es: {
    translation: {
      // Spanish translations
      common: {
        loading: 'Cargando...',
        error: 'Ocurrió un error',
        success: 'Éxito',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        save: 'Guardar',
        delete: 'Eliminar',
        edit: 'Editar',
        search: 'Buscar',
        filter: 'Filtrar',
        reset: 'Restablecer',
        submit: 'Enviar',
        close: 'Cerrar',
        back: 'Atrás',
        next: 'Siguiente',
        previous: 'Anterior',
      },
      
      nav: {
        home: 'Inicio',
        products: 'Productos',
        about: 'Acerca de',
        contact: 'Contacto',
        cart: 'Carrito',
        dashboard: 'Panel',
        orders: 'Pedidos',
        profile: 'Perfil',
        login: 'Iniciar sesión',
        signup: 'Registrarse',
        logout: 'Cerrar sesión',
      },
      
      auth: {
        welcomeBack: 'Bienvenido de nuevo',
        loginSubtitle: 'Inicia sesión en tu cuenta para continuar',
        createAccount: 'Crear cuenta',
        signupSubtitle: 'Únete y comienza a pedir mangos premium',
        email: 'Correo electrónico',
        password: 'Contraseña',
        confirmPassword: 'Confirmar contraseña',
        name: 'Nombre completo',
        phone: 'Teléfono',
        rememberMe: 'Recuérdame',
        forgotPassword: '¿Olvidaste tu contraseña?',
        noAccount: '¿No tienes una cuenta?',
        hasAccount: '¿Ya tienes una cuenta?',
        loginButton: 'Iniciar sesión',
        signupButton: 'Registrarse',
      },
      
      products: {
        title: 'Nuestros Productos',
        subtitle: 'Navega por nuestra selección premium de mangos frescos',
        searchPlaceholder: 'Buscar mangos...',
        featured: 'Destacado',
        outOfStock: 'Agotado',
        inStock: 'En stock',
        addToCart: 'Agregar al carrito',
      },
      
      cart: {
        title: 'Carrito de compras',
        empty: 'Tu carrito está vacío',
        startShopping: 'Comenzar a comprar',
        proceedToCheckout: 'Proceder al pago',
      },
      
      // Add more Spanish translations as needed
    },
  },
  
  hi: {
    translation: {
      // Hindi translations
      common: {
        loading: 'लोड हो रहा है...',
        error: 'एक त्रुटि हुई',
        success: 'सफलता',
        cancel: 'रद्द करें',
        confirm: 'पुष्टि करें',
        save: 'सहेजें',
        delete: 'हटाएं',
        edit: 'संपादित करें',
        search: 'खोजें',
        filter: 'फ़िल्टर',
        reset: 'रीसेट',
        submit: 'जमा करें',
        close: 'बंद करें',
      },
      
      nav: {
        home: 'होम',
        products: 'उत्पाद',
        about: 'हमारे बारे में',
        contact: 'संपर्क',
        cart: 'कार्ट',
        dashboard: 'डैशबोर्ड',
        orders: 'ऑर्डर',
        profile: 'प्रोफ़ाइल',
        login: 'लॉगिन',
        signup: 'साइन अप',
        logout: 'लॉगआउट',
      },
      
      auth: {
        welcomeBack: 'वापसी पर स्वागत है',
        loginSubtitle: 'जारी रखने के लिए अपने खाते में लॉगिन करें',
        email: 'ईमेल पता',
        password: 'पासवर्ड',
        loginButton: 'लॉगिन',
      },
      
      products: {
        title: 'हमारे उत्पाद',
        subtitle: 'ताजा आमों का हमारा प्रीमियम चयन देखें',
        searchPlaceholder: 'आम खोजें...',
        addToCart: 'कार्ट में जोड़ें',
      },
      
      // Add more Hindi translations as needed
    },
  },
};

// Language detector options
const detectionOptions = {
  order: ['localStorage', 'navigator', 'htmlTag'],
  lookupLocalStorage: 'i18nextLng',
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'],
};

// Initialize i18next
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    detection: detectionOptions,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    react: {
      useSuspense: true,
    },
    
    // Namespace configuration
    ns: ['translation'],
    defaultNS: 'translation',
    
    // Backend configuration (if loading translations from server)
    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json',
    // },
  });

export default i18next;