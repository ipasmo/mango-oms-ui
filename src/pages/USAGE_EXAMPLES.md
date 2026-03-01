# Pages Usage Examples

## Importing Pages

```javascript
// Import individual pages
import { Home, Login, Products } from '@pages';

// Or import specific page
import Home from '@pages/Home';
```

## Router Configuration Example

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import ProtectedRoute from '@components/ProtectedRoute';
import AdminRoute from '@components/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Page-Specific Examples

### Using Products Page with URL Parameters

```javascript
// Navigate to products with filters
navigate('/products?category=alphonso&minPrice=10&maxPrice=50&sortBy=price&sortOrder=asc');

// Or programmatically set search params
const searchParams = new URLSearchParams({
  category: 'alphonso',
  search: 'organic',
  sortBy: 'price',
  sortOrder: 'desc'
});
navigate(`/products?${searchParams.toString()}`);
```

### Using ProductDetail Page

```javascript
// Navigate to product detail
navigate(`/products/${productId}`);

// Or use Link component
<Link to={`/products/${product.id}`}>View Details</Link>
```

### Using Cart Store with Pages

```javascript
import useCartStore from '@store/cartStore';

function MyComponent() {
  const { items, addItem, removeItem, getTotal } = useCartStore();
  
  // Add product to cart (used in ProductDetail)
  const handleAddToCart = () => {
    addItem(product, quantity, lotSize);
  };
  
  return <div>Cart Total: ${getTotal()}</div>;
}
```

### Using Auth Store with Pages

```javascript
import useAuthStore from '@store/authStore';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <div>Welcome, {user.firstName}!</div>;
}
```

### Protected Route Example

```javascript
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@store/authStore';

function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <Outlet />;
}
```

### Admin Route Example

```javascript
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@store/authStore';

function AdminRoute() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Outlet />;
}
```

## Layout Integration Example

```javascript
import { Outlet } from 'react-router-dom';
import { Navbar, Footer, Sidebar } from '@components/layout';

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet /> {/* Pages render here */}
      </main>
      <Footer />
    </div>
  );
}

// In router configuration
<Route element={<MainLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  {/* ... other routes */}
</Route>
```

## Form Submission Examples

### Login Form

```javascript
const handleSubmit = async (values, { setSubmitting }) => {
  try {
    await login({
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    });
    navigate('/dashboard');
  } catch (err) {
    console.error('Login failed:', err);
  } finally {
    setSubmitting(false);
  }
};
```

### Checkout Form

```javascript
const handlePlaceOrder = async () => {
  try {
    const orderData = {
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        lotSize: item.lotSize,
        price: item.price,
      })),
      shippingAddress: shippingData,
      paymentMethod: paymentData.paymentMethod,
      total: getTotal(),
    };
    
    const result = await createOrder(orderData);
    clearCart();
    navigate('/order-confirmation', { state: { order: result } });
  } catch (error) {
    console.error('Order creation failed:', error);
  }
};
```

## Navigation Examples

### Programmatic Navigation

```javascript
// Navigate to a page
navigate('/products');

// Navigate with state
navigate('/checkout', { state: { from: '/cart' } });

// Go back
navigate(-1);

// Replace history
navigate('/dashboard', { replace: true });
```

### Link Navigation

```javascript
// Basic link
<Link to="/products">Shop Now</Link>

// Link with search params
<Link to="/products?category=alphonso">Alphonso Mangoes</Link>

// Link with state
<Link to="/checkout" state={{ from: 'cart' }}>Checkout</Link>
```

## Store Initialization Example

```javascript
import { useEffect } from 'react';
import useAuthStore from '@store/authStore';
import useCartStore from '@store/cartStore';

function App() {
  const { initialize } = useAuthStore();
  
  useEffect(() => {
    // Initialize auth from localStorage
    initialize();
  }, [initialize]);
  
  return <Router />;
}
```

## Error Handling Example

```javascript
function MyPage() {
  const { fetchData, isLoading, error } = useStore();
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  if (isLoading) {
    return <Spinner />;
  }
  
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }
  
  return <div>Content</div>;
}
```

## Testing Example

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '@pages/Login';

describe('Login Page', () => {
  it('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
  
  it('validates form fields', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });
});
```

## Best Practices

1. **Always use path aliases** for imports
2. **Handle loading states** with spinners
3. **Display error messages** to users
4. **Implement empty states** with helpful actions
5. **Add accessibility attributes** (aria-labels, roles)
6. **Use semantic HTML** elements
7. **Validate forms** with Formik + Yup
8. **Protect routes** that require authentication
9. **Clear error states** on component mount
10. **Implement proper navigation** with React Router
