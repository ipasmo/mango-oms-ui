// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
// ***********************************************

/**
 * Custom command to login
 */
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

/**
 * Custom command to logout
 */
Cypress.Commands.add('logout', () => {
  cy.get('[aria-label="User menu"]').click();
  cy.contains('Logout').click();
});

/**
 * Custom command to add product to cart
 */
Cypress.Commands.add('addToCart', (productIndex = 0, lotSize = '5kg') => {
  cy.visit('/products');
  cy.get('[data-testid="product-card"]').eq(productIndex).click();
  cy.get(`[data-testid="lot-size-${lotSize}"]`).click();
  cy.get('button').contains('Add to Cart').click();
});

/**
 * Custom command to clear cart
 */
Cypress.Commands.add('clearCart', () => {
  cy.visit('/cart');
  cy.get('[data-testid="clear-cart"]').click();
});
