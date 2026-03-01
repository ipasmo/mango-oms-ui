import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '@components/product/ProductCard';

// Mock product data
const mockProduct = {
  id: 1,
  name: 'Premium Alphonso Mango',
  description: 'Sweet and delicious mangoes',
  image: '/images/mango.jpg',
  price: 15,
  rating: 4.5,
  inStock: true,
};

// Wrapper component with Router
const AllTheProviders = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    customRender(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Premium Alphonso Mango')).toBeInTheDocument();
    expect(screen.getByText(/\$15\.00/i)).toBeInTheDocument();
  });

  it('displays in stock badge when product is available', () => {
    customRender(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText(/in stock/i)).toBeInTheDocument();
  });

  it('displays out of stock badge when product is unavailable', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    customRender(<ProductCard product={outOfStockProduct} />);
    
    expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
  });

  it('has a link to product detail page', () => {
    customRender(<ProductCard product={mockProduct} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/products/1');
  });
});
