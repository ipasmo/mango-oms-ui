describe('Products', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  describe('Product Listing', () => {
    it('should display product grid', () => {
      cy.get('[data-testid="product-grid"]').should('be.visible');
      cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);
    });

    it('should display product filters', () => {
      cy.get('[data-testid="product-filters"]').should('be.visible');
    });

    it('should search for products', () => {
      cy.get('input[placeholder*="Search"]').type('alphonso');
      cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);
      cy.contains('Alphonso').should('be.visible');
    });

    it('should filter products by category', () => {
      cy.get('[data-testid="category-filter"]').select('premium');
      cy.wait(500);
      cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);
    });

    it('should sort products', () => {
      cy.get('[data-testid="sort-select"]').select('price-asc');
      cy.wait(500);
      
      // Verify first product has lower price than last
      cy.get('[data-testid="product-price"]').first().then($first => {
        cy.get('[data-testid="product-price"]').last().then($last => {
          const firstPrice = parseFloat($first.text().replace('$', ''));
          const lastPrice = parseFloat($last.text().replace('$', ''));
          expect(firstPrice).to.be.lte(lastPrice);
        });
      });
    });
  });

  describe('Product Detail', () => {
    it('should navigate to product detail page', () => {
      cy.get('[data-testid="product-card"]').first().click();
      cy.url().should('include', '/products/');
      cy.get('[data-testid="product-detail"]').should('be.visible');
    });

    it('should display product information', () => {
      cy.get('[data-testid="product-card"]').first().click();
      
      cy.get('[data-testid="product-name"]').should('be.visible');
      cy.get('[data-testid="product-description"]').should('be.visible');
      cy.get('[data-testid="product-price"]').should('be.visible');
    });

    it('should allow lot size selection', () => {
      cy.get('[data-testid="product-card"]').first().click();
      
      cy.get('[data-testid="lot-size-3kg"]').click();
      cy.get('[data-testid="lot-size-5kg"]').click();
      cy.get('[data-testid="lot-size-10kg"]').click();
    });

    it('should add product to cart', () => {
      cy.get('[data-testid="product-card"]').first().click();
      
      cy.get('[data-testid="lot-size-5kg"]').click();
      cy.get('button').contains('Add to Cart').click();
      
      // Cart count should increase
      cy.get('[data-testid="cart-count"]').should('be.visible');
    });
  });

  describe('Product Search', () => {
    it('should show no results message for invalid search', () => {
      cy.get('input[placeholder*="Search"]').type('nonexistentproduct123');
      cy.contains('No products found').should('be.visible');
    });

    it('should clear search', () => {
      cy.get('input[placeholder*="Search"]').type('alphonso');
      cy.get('[data-testid="clear-search"]').click();
      cy.get('input[placeholder*="Search"]').should('have.value', '');
    });
  });
});
