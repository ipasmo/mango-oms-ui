# 🥭 Mango Order Management System - Frontend

A production-ready, enterprise-grade frontend application for managing mango orders, built with React, Vite, and modern web technologies.

![Mango OMS](https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=1200)

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

The Mango Order Management System (OMS) is a comprehensive e-commerce solution specifically designed for selling premium mangoes in carton lots (3kg, 5kg, and 10kg). The application provides a seamless user experience for browsing, ordering, and tracking mango deliveries.

### Key Highlights

- **Production-Ready**: Built with enterprise-grade architecture and best practices
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **High Performance**: Code splitting, lazy loading, and optimized bundle size
- **Secure**: XSS prevention, CSRF protection, secure token handling
- **Accessible**: WCAG 2.1 compliant with ARIA labels and keyboard navigation
- **Scalable**: Modular architecture ready for future enhancements

## 🚀 Tech Stack

### Core Technologies

- **React 18.2** - Modern UI library with Hooks
- **Vite 5.1** - Next-generation frontend build tool
- **React Router 6** - Client-side routing
- **Tailwind CSS 3.4** - Utility-first CSS framework

### State Management & Data

- **Zustand 4.5** - Lightweight state management
- **Axios 1.6** - HTTP client with interceptors
- **Formik 2.4** - Form management
- **Yup 1.3** - Schema validation

### UI & Visualization

- **Chart.js 4.4** - Data visualization
- **React-ChartJS-2 5.2** - React wrapper for Chart.js
- **React-Icons 5.0** - Icon library
- **React-Toastify 10.0** - Toast notifications
- **DOMPurify 3.0** - XSS sanitization

### Testing

- **Jest 29.7** - Unit testing framework
- **React Testing Library 14.2** - Component testing
- **Cypress 13.6** - End-to-end testing

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## ✨ Features

### User Features

#### 🏠 Home Page
- Fullscreen background video with farm footage
- Hero section with CTA buttons
- Featured products showcase
- Why choose us section with key benefits
- Fully responsive design

#### 🛍️ Product Catalog
- Browse all mango varieties
- Search functionality with debouncing
- Advanced filters (price range, variety, availability)
- Product cards with images, descriptions, and pricing
- Three lot sizes (3kg, 5kg, 10kg)
- Pagination for large catalogs
- Availability badges

#### 🛒 Shopping Cart
- Add/remove/update cart items
- Real-time price calculation
- Persistent cart (localStorage)
- Cart drawer for quick access
- Lot size selection
- Quantity management
- Free shipping threshold indicator

#### 📦 Order Management
- Multi-step checkout process
- Shipping address form with validation
- Multiple payment methods
- Order confirmation page
- Order history with status tracking
- Order timeline visualization
- Invoice download (mock)
- Cancel order functionality

#### 👤 User Dashboard
- Welcome message with user name
- Order statistics cards
- Order trends chart (Chart.js)
- Spending analytics chart
- Recent orders grid
- Profile management
- Responsive layout

#### 🔐 Authentication
- Login/Signup with validation
- JWT-based authentication
- Protected routes
- Persistent sessions
- Password strength validation
- Remember me functionality
- Forgot password flow

### Admin Features

#### 📊 Admin Dashboard
- System-wide statistics
- Order management panel
- Inventory controls
- Product CRUD operations
- User management
- Analytics and reporting

## 🏗️ Architecture

### Folder Structure

```
mango-order-system/
├── public/                  # Static assets
│   ├── videos/             # Background videos
│   └── images/             # Product images
│
├── src/
│   ├── api/                # API layer
│   │   ├── axiosInstance.js    # Configured Axios instance
│   │   ├── authApi.js          # Authentication endpoints
│   │   ├── productApi.js       # Product endpoints
│   │   ├── orderApi.js         # Order endpoints
│   │   └── adminApi.js         # Admin endpoints
│   │
│   ├── components/         # Reusable components
│   │   ├── common/            # Generic components
│   │   ├── layout/            # Layout components
│   │   ├── product/           # Product-related components
│   │   ├── cart/              # Cart components
│   │   ├── order/             # Order components
│   │   ├── dashboard/         # Dashboard components
│   │   └── home/              # Home page components
│   │
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Dashboard.jsx
│   │   └── ...
│   │
│   ├── layouts/            # Layout wrappers
│   │   ├── MainLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── AdminLayout.jsx
│   │
│   ├── routes/             # Routing configuration
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── AdminRoute.jsx
│   │
│   ├── store/              # Zustand stores
│   │   ├── authStore.js
│   │   ├── cartStore.js
│   │   ├── productStore.js
│   │   └── orderStore.js
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   │
│   ├── utils/              # Utility functions
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── security.js
│   │   ├── formatters.js
│   │   └── i18n.js
│   │
│   ├── validations/        # Form validation schemas
│   │   ├── authValidation.js
│   │   ├── orderValidation.js
│   │   └── productValidation.js
│   │
│   ├── tests/              # Test files
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
│
├── cypress/                # E2E tests
│   ├── e2e/
│   ├── fixtures/
│   └── support/
│
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── jest.config.js          # Jest configuration
├── cypress.config.js       # Cypress configuration
└── README.md               # This file
```

### Design Patterns

#### Component Architecture
- **Atomic Design**: Components organized from atoms to organisms
- **Container/Presentational**: Logic separated from presentation
- **Compound Components**: Complex components built from smaller ones

#### State Management
- **Zustand Stores**: Lightweight, flexible state management
- **Persistent State**: Cart and auth state persisted to localStorage
- **Computed Values**: Derived state calculated on-the-fly

#### API Layer
- **Centralized Axios Instance**: Single source for HTTP configuration
- **Interceptors**: Request/response interceptors for auth and errors
- **Service Pattern**: API calls organized by domain

## 🚦 Getting Started

### Prerequisites

- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher (or yarn/pnpm)
- **Git**: For version control

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/ipasmo/mango-oms-ui.git
cd mango-oms-ui
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` and configure your variables:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000
VITE_JWT_SECRET=your-jwt-secret
VITE_STRIPE_PUBLIC_KEY=your-stripe-key
VITE_APP_NAME=Mango OMS
VITE_ENVIRONMENT=development
```

4. **Start development server**

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Open Cypress E2E tests
npm run cypress:open

# Run Cypress tests headless
npm run cypress:run

# Run E2E tests (starts server + Cypress)
npm run e2e
```

### Development Workflow

1. **Create a feature branch**

```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**
   - Write clean, documented code
   - Follow ESLint rules
   - Add tests for new features

3. **Test your changes**

```bash
npm run test
npm run e2e
```

4. **Commit and push**

```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

5. **Create a pull request**

### Code Style Guide

- Use **functional components** with hooks
- Follow **React best practices**
- Write **semantic HTML**
- Use **Tailwind utility classes**
- Add **ARIA labels** for accessibility
- Write **meaningful comments**
- Keep components **small and focused**

### Component Example

```jsx
import React from 'react';
import clsx from 'clsx';

const Button = ({ children, variant = 'primary', onClick, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'px-6 py-3 rounded-lg font-medium transition-all',
        variant === 'primary' && 'bg-primary-500 text-white hover:bg-primary-600',
        variant === 'outline' && 'border-2 border-primary-500 text-primary-500',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </button>
  );
};

export default Button;
```

## 🧪 Testing

### Unit Testing (Jest + React Testing Library)

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

**Example Test:**

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### E2E Testing (Cypress)

```bash
# Open Cypress UI
npm run cypress:open

# Run headless
npm run cypress:run

# Full E2E test suite
npm run e2e
```

**Example E2E Test:**

```javascript
describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

### Coverage Goals

- **Statements**: 70%+
- **Branches**: 70%+
- **Functions**: 70%+
- **Lines**: 70%+

## 🚀 Deployment

### Vercel Deployment

#### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Method 2: Git Integration

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables
6. Deploy

### Netlify Deployment

#### Method 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Method 2: Git Integration

1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Connect your repository
4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Add environment variables
6. Deploy

### Manual Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains the production build
# Upload contents to your server
```

### Environment Variables for Production

Ensure these are set in your deployment platform:

```env
VITE_API_BASE_URL=https://api.your-domain.com
VITE_API_TIMEOUT=10000
VITE_STRIPE_PUBLIC_KEY=pk_live_your_key
VITE_APP_NAME=Mango OMS
VITE_ENVIRONMENT=production
VITE_ENABLE_ANALYTICS=true
```

### Post-Deployment Checklist

- [ ] All environment variables configured
- [ ] HTTPS enabled
- [ ] Custom domain configured
- [ ] CSP headers configured
- [ ] Analytics integrated
- [ ] Error tracking enabled (Sentry)
- [ ] Performance monitoring enabled
- [ ] Lighthouse audit passed (90+)

## 🔐 Security

### Frontend Security Measures

#### 1. XSS Prevention

```javascript
import DOMPurify from 'dompurify';

// Sanitize user input
const cleanInput = DOMPurify.sanitize(userInput);

// Sanitize HTML
const cleanHTML = DOMPurify.sanitize(htmlContent, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
  ALLOWED_ATTR: ['href'],
});
```

#### 2. CSRF Protection

```javascript
// Add CSRF token to requests
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  return config;
});
```

#### 3. Secure Token Storage

```javascript
// Store tokens securely (consider httpOnly cookies for production)
const storeToken = (token) => {
  // In production, use httpOnly, secure cookies set by backend
  localStorage.setItem('accessToken', token);
};

// Remove tokens on logout
const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
```

#### 4. Input Validation

```javascript
import * as Yup from 'yup';

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .matches(/[A-Z]/, 'Must contain uppercase')
    .matches(/[0-9]/, 'Must contain number')
    .required(),
});
```

### Backend Security Requirements

The frontend expects the backend to implement:

- **JWT Authentication** with refresh tokens
- **Rate Limiting** (express-rate-limit)
- **Helmet.js** for security headers
- **CORS** configuration
- **Input Sanitization**
- **SQL Injection Prevention**
- **Password Hashing** (bcrypt)
- **Environment Variables** for secrets
- **HTTPS Only** in production

### Security Headers (Configure on Server)

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-XSS-Protection: 1; mode=block
```

## ⚡ Performance

### Optimization Techniques

#### 1. Code Splitting

```javascript
// Lazy load routes
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
```

#### 2. Image Optimization

```jsx
// Lazy load images
<img
  src={product.image}
  alt={product.name}
  loading="lazy"
  className="w-full h-56 object-cover"
/>
```

#### 3. Bundle Optimization

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
        },
      },
    },
  },
};
```

#### 4. Performance Monitoring

```javascript
// Track Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Performance Metrics

Target metrics:

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **Lighthouse Score**: 90+

### CDN Configuration

```javascript
// Use CDN for static assets in production
const CDN_URL = import.meta.env.VITE_CDN_URL || '';

const getImageUrl = (path) => {
  return import.meta.env.PROD ? `${CDN_URL}${path}` : path;
};
```

## ♿ Accessibility

### WCAG 2.1 AA Compliance

#### Implemented Features

1. **Semantic HTML**
```jsx
<nav>, <main>, <section>, <article>, <aside>, <footer>
```

2. **ARIA Labels**
```jsx
<button aria-label="Close modal" onClick={handleClose}>
  <IoClose />
</button>
```

3. **Keyboard Navigation**
```jsx
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
/>
```

4. **Focus States**
```css
*:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}
```

5. **Color Contrast**
- Text on background: 4.5:1 minimum
- Large text: 3:1 minimum
- Tested with contrast checkers

6. **Screen Reader Support**
```jsx
<span className="sr-only">Loading...</span>
```

### Accessibility Testing

```bash
# Install axe-core
npm install --save-dev @axe-core/react

# Run accessibility audit
npm run test:a11y
```

## 🌐 Internationalization

### Setup

```javascript
// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: require('./locales/en.json') },
    es: { translation: require('./locales/es.json') },
  },
  lng: 'en',
  fallbackLng: 'en',
});
```

### Usage

```jsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();
  
  return <h1>{t('welcome')}</h1>;
};
```

### Currency Support

```javascript
const currencies = ['USD', 'SGD', 'INR'];

const formatPrice = (amount, currency) => {
  const symbols = { USD: '$', SGD: 'S$', INR: '₹' };
  return `${symbols[currency]}${amount.toFixed(2)}`;
};
```

## 🔧 Backend Integration

### Recommended Backend Stack

#### Primary Option: Node.js + Express + MongoDB

```javascript
// Express.js API structure
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);
```

#### Alternative Options

1. **Next.js Full-Stack**
   - API routes in Next.js
   - Server-side rendering
   - Built-in API handling

2. **Django + PostgreSQL**
   - Django REST Framework
   - Strong ORM
   - Admin panel included

3. **Firebase**
   - Firestore database
   - Firebase Auth
   - Cloud Functions
   - Quick setup

### API Contract

#### Authentication Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
PUT    /api/auth/profile
```

#### Product Endpoints

```
GET    /api/products
GET    /api/products/:id
GET    /api/products/search?q=query
GET    /api/products/featured
```

#### Order Endpoints

```
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id/cancel
GET    /api/orders/stats
```

#### Admin Endpoints

```
GET    /api/admin/dashboard
GET    /api/admin/orders
PUT    /api/admin/orders/:id/status
POST   /api/admin/products
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id
```

## 📈 Scaling Considerations

### Performance at Scale

1. **Implement CDN**
   - CloudFront, Cloudflare, or Fastly
   - Cache static assets
   - Edge locations worldwide

2. **Image Optimization**
   - Use image CDN (Cloudinary, ImageKit)
   - WebP format with fallbacks
   - Responsive images

3. **Database Optimization**
   - Indexing frequently queried fields
   - Query optimization
   - Caching layer (Redis)

4. **Load Balancing**
   - Multiple server instances
   - Horizontal scaling
   - Auto-scaling groups

### High Traffic Preparation

```javascript
// Implement request queuing
import PQueue from 'p-queue';

const queue = new PQueue({ concurrency: 5 });

const fetchProducts = () => {
  return queue.add(() => api.getProducts());
};
```

### Monitoring

```javascript
// Error tracking with Sentry
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-dsn',
  environment: import.meta.env.VITE_ENVIRONMENT,
  tracesSampleRate: 1.0,
});
```

## 🎯 Future Improvements

### Planned Features

- [ ] Progressive Web App (PWA)
- [ ] Push notifications
- [ ] Real-time order tracking with WebSocket
- [ ] Multi-language support
- [ ] Advanced search with filters
- [ ] Product recommendations
- [ ] Wishlist functionality
- [ ] Social sharing
- [ ] Customer reviews and ratings
- [ ] Loyalty program
- [ ] Subscription orders
- [ ] Mobile app (React Native)

### Technical Improvements

- [ ] Server-side rendering (Next.js migration)
- [ ] GraphQL API integration
- [ ] Advanced caching strategies
- [ ] Offline support
- [ ] A/B testing framework
- [ ] Advanced analytics
- [ ] Automated deployment pipeline
- [ ] Kubernetes orchestration

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

## 📞 Support

For support, email support@mangooms.com or join our Slack channel.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **ipasmo** - *Initial work* - [GitHub](https://github.com/ipasmo)

## 🙏 Acknowledgments

- Pexels for free stock images and videos
- React community for excellent libraries
- Tailwind CSS team for the amazing framework
- Chart.js for visualization library
- All contributors who have helped improve this project

---

**Built with ❤️ and 🥭 by the Mango OMS Team**

For more information, visit our [documentation](https://docs.mangooms.com) or [website](https://mangooms.com).