# Pages Documentation

This directory contains all page components for the Mango OMS UI application.

## 📄 Page Components

### 1. **Home.jsx**
- **Route**: `/`
- **Description**: Main landing page with hero section, featured products, and benefits showcase
- **Features**:
  - Hero banner with call-to-action
  - Featured products grid (6 products)
  - "Why Choose Us" section with 4 benefit cards
  - CTA section for shopping and signup
- **Components Used**: Hero, FeaturedProducts, Spinner
- **Stores**: productStore

### 2. **Login.jsx**
- **Route**: `/login`
- **Description**: User authentication page
- **Features**:
  - Email/password login form with Formik validation
  - Remember me checkbox
  - Password visibility toggle
  - Link to signup page
  - Forgot password link
  - Auto-redirect if already authenticated
- **Validation**: loginSchema (Yup)
- **Stores**: authStore

### 3. **Signup.jsx**
- **Route**: `/signup`
- **Description**: User registration page
- **Features**:
  - Multi-field signup form (firstName, lastName, email, phone, password, confirmPassword)
  - Password strength validation
  - Password visibility toggles
  - Link to login page
  - Auto-redirect if already authenticated
- **Validation**: signupSchema (Yup)
- **Stores**: authStore

### 4. **Products.jsx**
- **Route**: `/products`
- **Description**: Product listing page with filtering and search
- **Features**:
  - Product grid display
  - Advanced filters (category, price range, sort)
  - Search functionality
  - Pagination
  - Results count display
  - Empty state with clear filters option
  - Mobile-responsive filter toggle
- **Components Used**: ProductGrid, ProductFilters, SearchBar, Spinner
- **Stores**: productStore
- **URL Parameters**: category, search, minPrice, maxPrice, sortBy, sortOrder

### 5. **ProductDetail.jsx**
- **Route**: `/products/:id`
- **Description**: Single product detail page
- **Features**:
  - Image gallery with thumbnail navigation
  - Product information (name, price, description, rating)
  - Lot size selector (3kg, 5kg, 10kg, 20kg) with discounts
  - Quantity selector
  - Dynamic price calculation
  - Add to cart functionality
  - Breadcrumb navigation
  - Reviews section (placeholder)
  - Related products section
- **Components Used**: ProductGrid, Spinner
- **Stores**: productStore, cartStore

### 6. **Cart.jsx**
- **Route**: `/cart`
- **Description**: Shopping cart page
- **Features**:
  - Cart items list with quantity controls
  - Order summary with totals
  - Proceed to checkout button
  - Continue shopping link
  - Trust badges (secure checkout, returns, quality)
  - Empty cart state with call-to-action
- **Components Used**: CartItem, CartSummary
- **Stores**: cartStore

### 7. **Checkout.jsx**
- **Route**: `/checkout`
- **Description**: Multi-step checkout process
- **Features**:
  - 3-step checkout flow:
    1. Shipping Address
    2. Payment Method
    3. Order Review
  - Progress indicator
  - Form validation with Formik + Yup
  - Payment methods: Card, PayPal, Cash on Delivery
  - Order summary sidebar
  - Edit options for each step
  - Protected route (requires authentication)
- **Validation**: checkoutAddressSchema, paymentSchema
- **Stores**: cartStore, orderStore, authStore

### 8. **OrderConfirmation.jsx**
- **Route**: `/order-confirmation`
- **Description**: Order success page
- **Features**:
  - Success message with order number
  - Order details with items list
  - Order summary with totals
  - Estimated delivery date
  - Shipping address display
  - Links to order history and continue shopping
  - Email confirmation notice
- **Protected**: Requires order data from checkout

### 9. **Dashboard.jsx**
- **Route**: `/dashboard`
- **Description**: User dashboard with order overview
- **Features**:
  - Personalized welcome message
  - 4 statistics cards (Total Orders, Total Spent, Pending Orders, Delivered)
  - Order trends chart
  - Spending overview chart
  - Recent orders table (5 most recent)
  - Quick action cards (Browse, Track, Profile)
  - Empty state for new users
- **Components Used**: StatsCard, OrderChart, SpendingChart
- **Stores**: authStore, orderStore

### 10. **OrderHistory.jsx**
- **Route**: `/orders`
- **Description**: Complete order history with filtering
- **Features**:
  - List of all orders
  - Status filter (All, Pending, Processing, Shipped, Delivered, Cancelled)
  - Order cards with details
  - Pagination
  - Empty state with call-to-action
  - Results count display
- **Components Used**: OrderCard, Spinner
- **Stores**: orderStore

### 11. **Profile.jsx**
- **Route**: `/profile`
- **Description**: User profile management
- **Features**:
  - Tabbed interface:
    1. Profile Information (firstName, lastName, phone)
    2. Change Password
  - Form validation with Formik + Yup
  - Read-only email field
  - Password requirements display
  - Success/error notifications
  - Auto-dismiss success messages
- **Validation**: profileUpdateSchema, passwordChangeSchema
- **Stores**: authStore

### 12. **AdminDashboard.jsx**
- **Route**: `/admin/dashboard`
- **Description**: Administrator dashboard
- **Features**:
  - System-wide statistics (Users, Orders, Revenue, Products)
  - Order analytics chart
  - Revenue overview chart
  - Recent orders list (10 most recent)
  - Recent users list
  - Quick action cards for admin tasks
  - System health indicators
  - Admin-only access (redirects non-admins)
- **Components Used**: StatsCard, OrderChart, SpendingChart
- **Stores**: authStore, orderStore, productStore

### 13. **NotFound.jsx**
- **Route**: `*` (catch-all)
- **Description**: 404 error page
- **Features**:
  - Animated 404 illustration
  - Helpful links (Home, Products, Orders, Profile)
  - Go back button
  - Back to home button
  - Fun fact about mangoes
  - Support contact link

## 🎨 Common Features Across Pages

### Responsive Design
- All pages are fully responsive
- Mobile-first approach with Tailwind CSS
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

### Loading States
- Spinner component for async operations
- Skeleton loaders where applicable
- Disabled buttons during submission

### Error Handling
- Error messages displayed in red alert boxes
- Form field validation errors
- API error handling with user-friendly messages

### Accessibility
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly

### SEO
- Dynamic page titles
- Meta descriptions
- Proper heading hierarchy

## 🔐 Protected Routes

The following pages require authentication:
- Dashboard
- OrderHistory
- Profile
- Checkout (redirects to login with return path)
- OrderConfirmation (requires order data)
- AdminDashboard (requires admin role)

## 📦 Dependencies

### React Ecosystem
- `react` - Core library
- `react-router-dom` - Routing (useNavigate, useParams, useLocation, Link)

### Form Management
- `formik` - Form handling
- `yup` - Validation schemas

### State Management
- `zustand` - Store management
- Custom stores: authStore, cartStore, productStore, orderStore

### UI Components
- Custom components from `@components`
- `@heroicons/react` - Icon library
- Tailwind CSS for styling

## 🗂️ File Structure

```
src/pages/
├── Home.jsx
├── Login.jsx
├── Signup.jsx
├── Products.jsx
├── ProductDetail.jsx
├── Cart.jsx
├── Checkout.jsx
├── OrderConfirmation.jsx
├── Dashboard.jsx
├── OrderHistory.jsx
├── Profile.jsx
├── AdminDashboard.jsx
├── NotFound.jsx
└── index.js (exports all pages)
```

## 🚀 Usage

Import pages from the index file:

```javascript
import { 
  Home, 
  Login, 
  Signup, 
  Products, 
  ProductDetail,
  Cart,
  Checkout,
  OrderConfirmation,
  Dashboard,
  OrderHistory,
  Profile,
  AdminDashboard,
  NotFound
} from '@pages';
```

## 🧪 Testing Considerations

When testing these pages, consider:
- Authentication state
- Loading states
- Error states
- Empty states
- Form validation
- Navigation flows
- Protected route access
- Responsive behavior

## 📝 Notes

- All pages use path aliases (@pages, @components, @store, etc.)
- Forms use Formik + Yup for consistent validation
- All monetary values are displayed with 2 decimal places
- Dates are formatted using `toLocaleDateString()`
- Images should have alt text for accessibility
- All interactive elements have hover states
