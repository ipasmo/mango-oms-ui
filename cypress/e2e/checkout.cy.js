describe('Checkout Process', () => {
  beforeEach(() => {
    // Login first
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    
    // Add product to cart
    cy.visit('/products');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="lot-size-5kg"]').click();
    cy.get('button').contains('Add to Cart').click();
  });

  describe('Cart', () => {
    it('should display cart items', () => {
      cy.visit('/cart');
      cy.get('[data-testid="cart-item"]').should('have.length.greaterThan', 0);
    });

    it('should update item quantity', () => {
      cy.visit('/cart');
      cy.get('[data-testid="quantity-increase"]').first().click();
      cy.get('[data-testid="item-quantity"]').first().should('contain', '2');
    });

    it('should remove item from cart', () => {
      cy.visit('/cart');
      const initialCount = cy.get('[data-testid="cart-item"]').its('length');
      
      cy.get('[data-testid="remove-item"]').first().click();
      
      cy.get('[data-testid="cart-item"]').its('length').should('be.lt', initialCount);
    });

    it('should display cart summary', () => {
      cy.visit('/cart');
      cy.get('[data-testid="cart-summary"]').should('be.visible');
      cy.contains('Subtotal').should('be.visible');
      cy.contains('Tax').should('be.visible');
      cy.contains('Total').should('be.visible');
    });

    it('should navigate to checkout', () => {
      cy.visit('/cart');
      cy.get('button').contains('Proceed to Checkout').click();
      cy.url().should('include', '/checkout');
    });
  });

  describe('Checkout Form', () => {
    beforeEach(() => {
      cy.visit('/checkout');
    });

    it('should display checkout steps', () => {
      cy.contains('Shipping Address').should('be.visible');
    });

    it('should validate required fields', () => {
      cy.get('button').contains('Continue').click();
      
      cy.contains('Full name is required').should('be.visible');
      cy.contains('Street address is required').should('be.visible');
      cy.contains('City is required').should('be.visible');
    });

    it('should complete address step', () => {
      cy.get('input[name="fullName"]').type('John Doe');
      cy.get('input[name="street"]').type('123 Main Street');
      cy.get('input[name="city"]').type('New York');
      cy.get('input[name="state"]').type('NY');
      cy.get('input[name="zipCode"]').type('10001');
      cy.get('input[name="country"]').type('USA');
      cy.get('input[name="phone"]').type('1234567890');
      
      cy.get('button').contains('Continue').click();
      
      // Should proceed to payment step
      cy.contains('Payment Method').should('be.visible');
    });

    it('should select payment method', () => {
      // Complete address first
      cy.get('input[name="fullName"]').type('John Doe');
      cy.get('input[name="street"]').type('123 Main Street');
      cy.get('input[name="city"]').type('New York');
      cy.get('input[name="state"]').type('NY');
      cy.get('input[name="zipCode"]').type('10001');
      cy.get('input[name="country"]').type('USA');
      cy.get('input[name="phone"]').type('1234567890');
      cy.get('button').contains('Continue').click();
      
      // Select payment method
      cy.get('input[value="card"]').check();
      cy.get('input[name="cardNumber"]').type('4111111111111111');
      cy.get('input[name="cardName"]').type('John Doe');
      cy.get('input[name="expiryDate"]').type('12/25');
      cy.get('input[name="cvv"]').type('123');
      
      cy.get('button').contains('Continue').click();
      
      // Should proceed to review step
      cy.contains('Review Order').should('be.visible');
    });

    it('should display order review', () => {
      // Complete all steps
      cy.get('input[name="fullName"]').type('John Doe');
      cy.get('input[name="street"]').type('123 Main Street');
      cy.get('input[name="city"]').type('New York');
      cy.get('input[name="state"]').type('NY');
      cy.get('input[name="zipCode"]').type('10001');
      cy.get('input[name="country"]').type('USA');
      cy.get('input[name="phone"]').type('1234567890');
      cy.get('button').contains('Continue').click();
      
      cy.get('input[value="card"]').check();
      cy.get('input[name="cardNumber"]').type('4111111111111111');
      cy.get('input[name="cardName"]').type('John Doe');
      cy.get('input[name="expiryDate"]').type('12/25');
      cy.get('input[name="cvv"]').type('123');
      cy.get('button').contains('Continue').click();
      
      // Verify order review
      cy.contains('Shipping Address').should('be.visible');
      cy.contains('John Doe').should('be.visible');
      cy.contains('123 Main Street').should('be.visible');
    });

    it('should place order', () => {
      // Complete checkout process
      cy.get('input[name="fullName"]').type('John Doe');
      cy.get('input[name="street"]').type('123 Main Street');
      cy.get('input[name="city"]').type('New York');
      cy.get('input[name="state"]').type('NY');
      cy.get('input[name="zipCode"]').type('10001');
      cy.get('input[name="country"]').type('USA');
      cy.get('input[name="phone"]').type('1234567890');
      cy.get('button').contains('Continue').click();
      
      cy.get('input[value="cod"]').check();
      cy.get('button').contains('Continue').click();
      
      cy.get('button').contains('Place Order').click();
      
      // Should redirect to confirmation page
      cy.url().should('include', '/order-confirmation');
      cy.contains('Order Placed Successfully').should('be.visible');
    });
  });
});
