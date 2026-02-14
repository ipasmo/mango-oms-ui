describe('Checkout', () => {
  beforeEach(() => {
    // Login and add items to cart
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();
    
    cy.visit('/products');
    cy.contains('3kg').first().click();
    cy.wait(500);
  });
  
  it('should display cart items', () => {
    cy.visit('/cart');
    cy.contains('Shopping Cart').should('be.visible');
    cy.get('img').should('be.visible');
  });
  
  it('should update item quantity', () => {
    cy.visit('/cart');
    cy.get('[aria-label="Increase quantity"]').click();
    // Quantity should be 2
  });
  
  it('should remove item from cart', () => {
    cy.visit('/cart');
    cy.get('[aria-label="Remove item"]').click();
    cy.contains('Your cart is empty').should('be.visible');
  });
  
  it('should proceed to checkout', () => {
    cy.visit('/cart');
    cy.contains('Proceed to Checkout').click();
    cy.url().should('include', '/checkout');
  });
  
  it('should complete checkout process', () => {
    cy.visit('/checkout');
    
    // Fill shipping address
    cy.get('input[name="shippingAddress.fullName"]').type('John Doe');
    cy.get('input[name="shippingAddress.phone"]').type('1234567890');
    cy.get('input[name="shippingAddress.addressLine1"]').type('123 Main St');
    cy.get('input[name="shippingAddress.city"]').type('New York');
    cy.get('input[name="shippingAddress.state"]').type('NY');
    cy.get('input[name="shippingAddress.postalCode"]').type('10001');
    cy.get('select[name="shippingAddress.country"]').select('USA');
    
    // Select payment method
    cy.get('input[value="credit_card"]').check();
    
    // Place order
    cy.contains('Place Order').click();
    
    // Should see confirmation
    cy.url().should('include', '/confirmation');
    cy.contains('Order Placed Successfully').should('be.visible');
  });
});