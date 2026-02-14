import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      products: 'Products',
      cart: 'Cart',
      orders: 'Orders',
      profile: 'Profile',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      
      // Common
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      checkout: 'Checkout',
      placeOrder: 'Place Order',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      
      // Products
      productDetails: 'Product Details',
      quantity: 'Quantity',
      price: 'Price',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      
      // Cart
      yourCart: 'Your Cart',
      emptyCart: 'Your cart is empty',
      subtotal: 'Subtotal',
      total: 'Total',
      continueShoppingupContinue Shopping',
      
      // Orders
      orderHistory: 'Order History',
      orderDetails: 'Order Details',
      orderStatus: 'Order Status',
      trackOrder: 'Track Order',
      
      // Auth
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone',
      
      // Messages
      loginSuccess: 'Login successful!',
      signupSuccess: 'Account created successfully!',
      orderPlaced: 'Order placed successfully!',
      itemAdded: 'Item added to cart!',
    },
  },
  es: {
    translation: {
      home: 'Inicio',
      products: 'Productos',
      cart: 'Carrito',
      orders: 'Pedidos',
      profile: 'Perfil',
      login: 'Iniciar Sesión',
      signup: 'Registrarse',
      logout: 'Cerrar Sesión',
      search: 'Buscar',
      filter: 'Filtrar',
      sort: 'Ordenar',
      addToCart: 'Añadir al Carrito',
      buyNow: 'Comprar Ahora',
      checkout: 'Pagar',
      placeOrder: 'Realizar Pedido',
      cancel: 'Cancelar',
      save: 'Guardar',
      edit: 'Editar',
      delete: 'Eliminar',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
    },
  },
  hi: {
    translation: {
      home: 'होम',
      products: 'उत्पाद',
      cart: 'कार्ट',
      orders: 'ऑर्डर',
      profile: 'प्रोफ़ाइल',
      login: 'लॉगिन',
      signup: 'साइन अप',
      logout: 'लॉगआउट',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      sort: 'क्रमबद्ध करें',
      addToCart: 'कार्ट में जोड़ें',
      buyNow: 'अभी खरीदें',
      checkout: 'चेकआउट',
      placeOrder: 'ऑर्डर दें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
