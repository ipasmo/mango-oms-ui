# 🥭 Mango Order Management System - Frontend

A modern, production-ready React frontend application for managing mango orders. Built with React 18, Vite, Tailwind CSS, and Zustand for state management.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Integration](#api-integration)
- [Security](#security)
- [Performance](#performance)
- [Accessibility](#accessibility)

## ✨ Features

### Core Features
- **Authentication**: JWT-based login/signup with protected routes
- **Product Catalog**: Browse, search, and filter mangoes in 3kg, 5kg, and 10kg lots
- **Shopping Cart**: Add/remove/update items with localStorage persistence
- **Checkout**: Multi-step checkout with address and payment forms
- **Order Management**: View order history, track orders, and check status
- **User Dashboard**: Personal statistics, charts, and recent orders
- **Admin Dashboard**: System-wide statistics and management tools
- **Internationalization**: Support for English, Spanish, and Hindi
- **Responsive Design**: Mobile-first, fully responsive UI

### Security Features
- XSS prevention with DOMPurify
- CSRF token support
- Input sanitization
- Secure token storage
- Password strength validation

## 🛠 Tech Stack

### Core
- **React** 18.2.0 - UI library
- **Vite** 5.1.0 - Build tool and dev server
- **React Router** 6.22.0 - Routing
- **Zustand** 4.5.0 - State management

### Styling
- **Tailwind CSS** 3.4.1 - Utility-first CSS framework
- **PostCSS** 8.4.35 - CSS processing
- **Autoprefixer** 10.4.17 - CSS vendor prefixes

### Forms & Validation
- **Formik** 2.4.5 - Form management
- **Yup** 1.3.3 - Schema validation

### Data & API
- **Axios** 1.6.7 - HTTP client with interceptors
- **Chart.js** 4.4.1 - Data visualization
- **react-chartjs-2** 5.2.0 - React wrapper for Chart.js

### Internationalization
- **i18next** 23.8.2 - Internationalization framework
- **react-i18next** 14.0.5 - React bindings for i18next
- **i18next-browser-languagedetector** 7.2.0 - Language detection

### Security
- **DOMPurify** 3.0.9 - XSS protection

### Testing
- **Jest** 29.7.0 - Unit testing framework
- **React Testing Library** 14.2.1 - React component testing
- **Cypress** 13.6.4 - E2E testing

### Development Tools
- **ESLint** 8.56.0 - Linting
- **Babel** - JavaScript transpilation

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Git

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
   
   Edit `.env` and configure:
   - `VITE_API_BASE_URL` - Your backend API URL
   - Other environment-specific variables

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
mango-oms-ui/
├── public/                 # Static assets
│   ├── images/            # Image assets
│   └── videos/            # Video assets
├── src/
│   ├── api/               # API layer
│   │   ├── axiosInstance.js
│   │   ├── authApi.js
│   │   ├── productApi.js
│   │   ├── orderApi.js
│   │   └── adminApi.js
│   ├── assets/            # Styles and assets
│   │   └── styles/
│   │       └── global.css
│   ├── components/        # React components
│   │   ├── common/       # Reusable components
│   │   ├── layout/       # Layout components
│   │   ├── product/      # Product components
│   │   ├── cart/         # Cart components
│   │   ├── order/        # Order components
│   │   ├── dashboard/    # Dashboard components
│   │   └── home/         # Home page components
│   ├── pages/            # Page components
│   ├── layouts/          # Layout wrappers
│   ├── routes/           # Routing configuration
│   ├── store/            # Zustand stores
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── validations/      # Validation schemas
│   ├── tests/            # Test files
│   ├── App.jsx           # Root component
│   └── main.jsx          # Entry point
├── cypress/              # E2E tests
│   ├── e2e/
│   ├── fixtures/
│   └── support/
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── jest.config.js        # Jest configuration
├── cypress.config.js     # Cypress configuration
└── package.json          # Dependencies
```

## 💻 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Open Cypress test runner
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run

# Lint code
npm run lint
```

### Path Aliases

The project uses Vite path aliases for cleaner imports:

```javascript
import Button from '@components/common/Button';
import useAuth from '@hooks/useAuth';
import { formatCurrency } from '@utils/formatters';
import useAuthStore from '@store/authStore';
```

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS utility classes
- Add JSDoc comments for props
- Include accessibility attributes
- Implement proper error boundaries

## 🧪 Testing

### Unit Tests (Jest + React Testing Library)

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

Coverage thresholds: 70% for branches, functions, lines, and statements.

### E2E Tests (Cypress)

```bash
# Open Cypress UI
npm run cypress:open

# Run headless
npm run cypress:run
```

Test scenarios include:
- Authentication (login, signup, logout)
- Product browsing and search
- Cart management
- Checkout process

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Platforms

#### Vercel
1. Connect your GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables
4. Deploy

#### Netlify
1. Connect your GitHub repository
2. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables
4. Deploy

### Environment Variables

Set these in your deployment platform:
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_API_TIMEOUT` - API timeout (optional)
- Other app-specific variables

## 🔌 API Integration

The application uses Axios with interceptors for API communication.

### Configuration

Configure the API base URL in `.env`:
```
VITE_API_BASE_URL=https://api.example.com
```

### API Structure

- **Auth API**: Login, signup, profile management
- **Product API**: Product catalog, search, filters
- **Order API**: Order creation, history, tracking
- **Admin API**: Admin dashboard, user management

### Authentication

- JWT tokens stored in localStorage
- Automatic token refresh
- Request/response interceptors
- CSRF token support

## 🔒 Security

### Implemented Security Measures

1. **XSS Protection**
   - Input sanitization with DOMPurify
   - Escaped output rendering
   - Content Security Policy headers (configure in hosting)

2. **CSRF Protection**
   - CSRF tokens for non-GET requests
   - Token validation in API interceptors

3. **Authentication**
   - Secure token storage
   - Automatic token refresh
   - Protected routes

4. **Input Validation**
   - Client-side validation with Yup
   - Server-side validation (backend)
   - SQL injection prevention

5. **Password Security**
   - Minimum 8 characters
   - Requires uppercase, lowercase, number, special char
   - Password strength indicator

### Security Best Practices

- Never commit secrets to Git
- Use environment variables for sensitive data
- Implement rate limiting (backend)
- Enable HTTPS in production
- Regular dependency updates
- Security headers configuration

## ⚡ Performance

### Optimization Techniques

1. **Code Splitting**
   - Route-based code splitting
   - Lazy loading components
   - Vendor chunk separation

2. **Build Optimization**
   - Tree shaking
   - Minification
   - Source maps for debugging

3. **Asset Optimization**
   - Image optimization
   - CSS purging (Tailwind)
   - Font loading optimization

4. **Caching**
   - Browser caching headers
   - Service worker (optional)
   - LocalStorage for cart persistence

### Performance Monitoring

Monitor these metrics:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Bundle size

## ♿ Accessibility

### Compliance

- WCAG 2.1 Level AA compliance
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Screen reader support

### Accessibility Features

- Focus management
- Skip links
- Alt text for images
- Color contrast ratios
- Form labels and error messages
- Accessible modals and dropdowns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **ipasmo** - [GitHub Profile](https://github.com/ipasmo)

## 🙏 Acknowledgments

- Mango suppliers for inspiration
- React community for amazing tools
- Contributors and testers

## 📞 Support

For support, email support@mangooms.com or open an issue on GitHub.

---

Made with ❤️ for fresh mango lovers worldwide 🥭
