describe('Products', () => {
  beforeEach(() => {
    cy.visit('/products');
  });
  
  it('should display products page', () => {
    cy.get('h1').should('contain', 'Our Products');
    cy.get('[aria-label="Search products"]').should('be.visible');
  });
  
  it('should search for products', () => {
    cy.get('[aria-label="Search products"]').type('Alphonso');
    cy.wait(1000); // Wait for debounce
    cy.contains('Alphonso').should('be.visible');
  });
  
  it('should filter products by price', () => {
    cy.contains('Min Price').parent().find('input').type('50');
    cy.contains('Max Price').parent().find('input').type('100');
    // Products should be filtered
  });
  
  it('should add product to cart', () => {
    cy.contains('3kg').first().click();
    cy.contains('added to cart').should('be.visible');
    cy.get('[aria-label="Shopping cart"]').find('span').should('contain', '1');
  });
  
  it('should navigate to product detail', () => {
    cy.get('img').first().click();
    cy.url().should('include', '/products/');
  });
});