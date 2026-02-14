import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '@components/product/ProductCard';

const mockProduct = {
  id: '1',
  name: 'Alphonso Mango',
  description: 'Premium quality mangoes',
  image: 'https://example.com/mango.jpg',
  prices: {
    '3kg': 29.99,
    '5kg': 49.99,
    '10kg': 89.99,
  },
  stock: 100,
  featured: true,
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ProductCard', () => {
  test('renders product information correctly', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Alphonso Mango')).toBeInTheDocument();
    expect(screen.getByText(/Premium quality mangoes/i)).toBeInTheDocument();
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });
  
  test('displays all three lot size prices', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
    expect(screen.getByText('$89.99')).toBeInTheDocument();
  });
  
  test('shows out of stock badge when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    renderWithRouter(<ProductCard product={outOfStockProduct} />);
    
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });
  
  test('add to cart buttons are disabled when out of stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    renderWithRouter(<ProductCard product={outOfStockProduct} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      if (button.textContent.includes('kg')) {
        expect(button).toBeDisabled();
      }
    });
  });
});