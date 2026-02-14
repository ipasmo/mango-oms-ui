# Feature Components Documentation

This document provides an overview of all feature components created for the Mango OMS UI.

## Component Summary

All components are production-ready React components using Tailwind CSS and following established patterns from the common components.

---

## Product Components (`src/components/product/`)

### 1. ProductCard.jsx
**Purpose:** Card component displaying individual product information

**Features:**
- Product image with lazy loading
- Product name and description (with line clamping)
- Lot size selection (3kg, 5kg, 10kg) with visual feedback
- Dynamic pricing based on selected lot size
- Add to cart button with loading state
- Stock status indicator
- Featured/discount badges
- Hover effects and responsive design

**Props:**
- `product` - Product object (id, name, image, description, prices, stock)
- `currency` - Currency code (default: 'USD')
- `onClick` - Click handler
- `className` - Additional CSS classes

### 2. ProductGrid.jsx
**Purpose:** Responsive grid layout for displaying multiple products

**Features:**
- Configurable column layout (2, 3, 4, 5 columns)
- Loading state with spinner
- Error state with message
- Empty state with helpful message
- Responsive breakpoints
- Accessibility attributes

**Props:**
- `products` - Array of product objects
- `loading` - Loading state
- `error` - Error state
- `errorMessage` - Custom error message
- `emptyMessage` - Custom empty message
- `currency` - Currency code
- `onProductClick` - Product click handler
- `columns` - Number of columns (default: 4)

### 3. ProductFilters.jsx
**Purpose:** Sidebar/panel with filters and sort options

**Features:**
- Sort options (featured, price, name)
- Category filters with counts
- Price range sliders (min/max)
- Reset filters button
- Mobile overlay version
- Active filter indicators
- Accessible form controls

**Props:**
- `categories` - Array of category objects
- `filters` - Current filter values
- `onFilterChange` - Filter change callback
- `showMobile` - Show mobile version
- `onClose` - Close callback for mobile

### 4. SearchBar.jsx
**Purpose:** Search input with debounce functionality

**Features:**
- Debounced search (configurable delay)
- Clear button
- Search icon
- Accessibility labels
- Form submission support
- Responsive design

**Props:**
- `value` - Controlled input value
- `onChange` - Change callback
- `onSearch` - Search callback (debounced)
- `placeholder` - Placeholder text
- `debounceDelay` - Debounce delay (default: 500ms)

---

## Cart Components (`src/components/cart/`)

### 1. CartItem.jsx
**Purpose:** Single cart item with controls

**Features:**
- Product image and details
- Lot size display
- Quantity controls (increment/decrement)
- Direct quantity input
- Remove button
- Price per item and total
- Readonly mode for checkout
- Hover effects

**Props:**
- `item` - Cart item object (product, quantity, lotSize)
- `currency` - Currency code
- `onQuantityChange` - Quantity change callback
- `onRemove` - Remove callback
- `readonly` - Disable controls

### 2. CartSummary.jsx
**Purpose:** Order summary with totals

**Features:**
- Subtotal, tax, shipping breakdown
- Discount display
- Grand total
- Free shipping indicator
- Almost free shipping notice
- Formatted currency
- Compact mode option

**Props:**
- `subtotal` - Subtotal amount
- `tax` - Tax amount
- `shipping` - Shipping amount
- `total` - Grand total
- `currency` - Currency code
- `discount` - Discount amount
- `compact` - Compact view without card wrapper

### 3. CartDrawer.jsx
**Purpose:** Slide-out cart drawer

**Features:**
- Slide animation from right
- Backdrop with click to close
- Empty cart state
- Cart items list with controls
- Cart summary
- Checkout button
- Continue shopping button
- Keyboard navigation (ESC to close)
- Body scroll lock
- Item count display

**Props:**
- `onCheckout` - Checkout callback
- `currency` - Currency code

**Hooks Used:**
- `useCart` - Cart state and actions

---

## Order Components (`src/components/order/`)

### 1. OrderCard.jsx
**Purpose:** Card displaying order summary

**Features:**
- Order number and date
- Status badge
- Items summary (images and count)
- Detailed item list (optional)
- Shipping address
- Total amount
- View details button
- Order again button (for delivered orders)
- Cancel button (for pending orders)

**Props:**
- `order` - Order object (id, orderNumber, date, status, items, total)
- `currency` - Currency code
- `onClick` - Click callback
- `showDetails` - Show detailed item list

### 2. OrderStatusBadge.jsx
**Purpose:** Colored badge for order status

**Features:**
- Status-specific colors
- Icons for each status
- Animated processing icon
- Three sizes (sm, md, lg)
- Accessible labels

**Props:**
- `status` - Order status (pending, confirmed, processing, shipped, delivered, cancelled)
- `size` - Badge size (default: 'md')

**Statuses:**
- `pending` - Yellow badge with clock icon
- `confirmed` - Blue badge with checkmark icon
- `processing` - Purple badge with spinning icon
- `shipped` - Indigo badge with truck icon
- `delivered` - Green badge with checkmark icon
- `cancelled` - Red badge with X icon

### 3. OrderTimeline.jsx
**Purpose:** Visual timeline showing order progress

**Features:**
- Vertical timeline layout
- Completed/current/pending states
- Status-specific icons and colors
- Timestamps with relative time
- Additional notes
- Tracking numbers
- Connector lines
- Cancelled state handling

**Props:**
- `steps` - Array of timeline steps
- `currentStatus` - Current order status

---

## Dashboard Components (`src/components/dashboard/`)

### 1. StatsCard.jsx
**Purpose:** Card displaying a statistic with icon

**Features:**
- Large value display
- Title and icon
- Change percentage with trend
- Trend indicators (up/down/neutral)
- Color-coded badges
- Default icons for common stats
- Loading state
- Formatted numbers

**Props:**
- `title` - Card title
- `value` - Main value
- `change` - Percentage change
- `changeLabel` - Change label (e.g., "vs last month")
- `icon` - Icon component or name
- `iconColor` - Icon background color
- `trend` - Trend direction ('up', 'down', 'neutral')
- `loading` - Loading state

### 2. OrderChart.jsx
**Purpose:** Line chart for orders over time

**Features:**
- Chart.js integration
- Multiple datasets support
- Responsive sizing
- Interactive tooltips
- Legend
- Gradient fill
- Smooth curves
- Grid customization
- Loading state

**Props:**
- `data` - Chart data with labels and datasets
- `title` - Chart title
- `period` - Time period (day, week, month, year)
- `loading` - Loading state

**Chart.js Features:**
- CategoryScale, LinearScale
- PointElement, LineElement
- Filler for gradient
- Custom tooltip formatting

### 3. SpendingChart.jsx
**Purpose:** Doughnut/Pie chart for spending by category

**Features:**
- Chart.js integration
- Doughnut or pie type
- Custom colors per category
- Interactive tooltips
- Legend with percentages
- Center text (for doughnut)
- Formatted currency
- Total calculation
- Hover effects
- Loading state

**Props:**
- `data` - Chart data with labels and values
- `title` - Chart title
- `currency` - Currency code
- `type` - Chart type ('doughnut' or 'pie')
- `loading` - Loading state

---

## Home Components (`src/components/home/`)

### 1. Hero.jsx
**Purpose:** Hero section with call-to-action

**Features:**
- Background image or gradient
- Overlay with opacity control
- Title and subtitle
- Primary and secondary CTA buttons
- Feature icons with benefits
- Scroll indicator
- Responsive typography
- Fade-in animations
- Configurable height

**Props:**
- `title` - Main heading
- `subtitle` - Subheading
- `backgroundImage` - Background image URL
- `primaryCta` - Primary button text
- `secondaryCta` - Secondary button text
- `onPrimaryClick` - Primary button handler
- `onSecondaryClick` - Secondary button handler
- `height` - Section height
- `overlay` - Enable overlay

### 2. FeaturedProducts.jsx
**Purpose:** Grid of featured products

**Features:**
- Section title and subtitle
- Product grid using ProductCard
- Loading state
- Empty state
- View all button
- Configurable product limit
- Responsive grid
- Centered layout

**Props:**
- `products` - Featured products array
- `title` - Section title
- `subtitle` - Section subtitle
- `currency` - Currency code
- `onProductClick` - Product click handler
- `onViewAll` - View all button handler
- `loading` - Loading state
- `limit` - Max products to show

### 3. VideoBackground.jsx
**Purpose:** Full-screen video background

**Features:**
- Video playback with controls
- Fallback image support
- Poster image
- Auto-play, loop, mute options
- Play/pause button
- Mute/unmute button
- Loading state
- Error handling
- Overlay customization
- Content overlay support

**Props:**
- `videoUrl` - Video URL (default: Pexels video)
- `fallbackImage` - Fallback image
- `posterImage` - Poster image
- `autoplay` - Auto-play
- `loop` - Loop video
- `muted` - Mute video
- `controls` - Show controls
- `children` - Overlay content
- `overlay` - Overlay color/gradient

---

## Import Patterns

All feature components can be imported from their index files:

```javascript
// Product components
import { ProductCard, ProductGrid, ProductFilters, SearchBar } from '@components/product';

// Cart components
import { CartItem, CartSummary, CartDrawer } from '@components/cart';

// Order components
import { OrderCard, OrderStatusBadge, OrderTimeline } from '@components/order';

// Dashboard components
import { StatsCard, OrderChart, SpendingChart } from '@components/dashboard';

// Home components
import { Hero, FeaturedProducts, VideoBackground } from '@components/home';
```

---

## Common Patterns Used

### 1. Prop Validation
All components include JSDoc comments for prop documentation.

### 2. Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management

### 3. Responsive Design
- Mobile-first approach
- Tailwind responsive classes
- Breakpoints: sm, md, lg, xl

### 4. Loading States
- Skeleton loaders
- Spinners with text
- Disabled states

### 5. Error Handling
- Error boundaries support
- Fallback UI
- User-friendly messages

### 6. Common Utilities
- `cn()` - Class name utility from helpers
- `formatCurrency()` - Currency formatting
- `formatDate()` - Date formatting
- `formatWeight()` - Weight formatting

### 7. Hooks Used
- `useCart` - Cart management
- `useDebounce` - Input debouncing
- `useState`, `useEffect`, `useRef` - React hooks

### 8. Dependencies
- Tailwind CSS - Styling
- Chart.js - Charts
- react-chartjs-2 - React Chart wrapper
- clsx - Class name utility

---

## Testing Recommendations

### Unit Tests
- Component rendering
- Prop handling
- Event handlers
- State management

### Integration Tests
- User interactions
- Form submissions
- Navigation flows

### Accessibility Tests
- Keyboard navigation
- Screen reader compatibility
- ARIA attributes
- Color contrast

---

## Performance Considerations

1. **Lazy Loading**: Product images use `loading="lazy"`
2. **Code Splitting**: Components can be lazy loaded
3. **Memoization**: Consider React.memo for expensive renders
4. **Debouncing**: Search uses debounce to reduce API calls
5. **Chart Performance**: Chart instances are properly cleaned up

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features
- CSS Grid and Flexbox
- Responsive design

---

## Future Enhancements

1. Add unit tests for all components
2. Add Storybook stories for component documentation
3. Implement skeleton loaders for better loading UX
4. Add animation libraries for enhanced transitions
5. Implement virtual scrolling for large product lists
6. Add image optimization and lazy loading strategies
7. Implement PWA features
8. Add internationalization (i18n) support
