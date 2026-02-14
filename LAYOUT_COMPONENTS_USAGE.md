# Layout Components Usage Guide

This guide explains how to use the newly created layout components in the Mango OMS UI application.

## Components Overview

### 1. Navbar (`src/components/layout/Navbar.jsx`)
A responsive navigation bar with:
- Logo/brand ("Mango OMS")
- Navigation links (Home, Products, Dashboard, Orders)
- Cart icon with item count badge
- User menu dropdown (login/signup or profile/logout)
- Language switcher
- Mobile hamburger menu

### 2. Footer (`src/components/layout/Footer.jsx`)
A footer with:
- Company information section
- Quick links (About, Contact, Terms, Privacy)
- Social media icon placeholders
- Newsletter subscription form
- Copyright notice
- Responsive grid layout

### 3. Sidebar (`src/components/layout/Sidebar.jsx`)
A collapsible sidebar for dashboard with:
- Navigation links (Dashboard, Orders, Profile, Settings)
- Admin section (visible only for admin users)
- Collapsible state for desktop
- Mobile responsive drawer style
- Fixed floating button on mobile

## Import Methods

### Individual imports:
```javascript
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';
import Sidebar from '@components/layout/Sidebar';
```

### Named imports (recommended):
```javascript
import { Navbar, Footer, Sidebar } from '@components/layout';
```

## Usage Examples

### Basic Page Layout
```javascript
import { Navbar, Footer } from '@components/layout';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Your page content */}
      </main>
      <Footer />
    </div>
  );
};
```

### Dashboard Layout with Sidebar
```javascript
import { Navbar, Footer, Sidebar } from '@components/layout';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          {/* Your dashboard content */}
        </main>
      </div>
      <Footer />
    </div>
  );
};
```

### Reusable Layout Wrapper
```javascript
import { Navbar, Footer, Sidebar } from '@components/layout';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Usage in routes
<DashboardLayout>
  <YourComponent />
</DashboardLayout>
```

## Features

### Navbar Features
- **Responsive**: Automatically switches to mobile menu on small screens
- **Cart Integration**: Uses `useCart()` hook to display item count
- **Auth Integration**: Uses `useAuth()` hook to show appropriate menu items
- **Language Switcher**: Integrated LanguageSwitcher component
- **Active Link Highlighting**: Uses NavLink for active state styling
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Footer Features
- **Responsive Grid**: Adapts from 1 to 4 columns based on screen size
- **Social Media Links**: Placeholder links with icons for major platforms
- **Quick Links**: Easy navigation to important pages
- **Newsletter Form**: Email subscription form
- **Dynamic Copyright**: Automatically updates year

### Sidebar Features
- **Collapsible**: Can be collapsed on desktop to save space
- **Admin Section**: Conditionally rendered based on user role
- **Mobile Drawer**: Slide-in drawer on mobile devices
- **Floating Button**: Mobile-only button to open sidebar
- **Active Route Highlighting**: Visual feedback for current page
- **Auto-close**: Mobile menu closes on route change
- **Accessibility**: Full keyboard navigation and ARIA support

## Customization

### Styling
All components use Tailwind CSS classes and can be customized by:
- Modifying the className props
- Updating Tailwind configuration
- Adding custom CSS classes

### Sidebar Custom className
```javascript
<Sidebar className="bg-gray-100" />
```

### Navigation Links
Edit the `navLinks` array in each component to add/remove links:

```javascript
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  // Add more links...
];
```

## Dependencies
- React Router DOM (Link, NavLink, useLocation)
- useAuth hook from `@hooks/useAuth`
- useCart hook from `@hooks/useCart`
- LanguageSwitcher from `@components/common/LanguageSwitcher`
- cn utility from `@utils/helpers`

## Accessibility Features
- Semantic HTML elements (nav, main, footer, aside)
- ARIA labels and attributes
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Proper heading hierarchy

## Browser Support
All components are built with modern React and should work in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Notes
- Components handle both authenticated and non-authenticated states
- Admin-only sections check user role via `isAdmin` from useAuth
- Mobile breakpoints follow Tailwind's default (md: 768px)
- All SVG icons are inline for better performance
