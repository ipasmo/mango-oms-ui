describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Login', () => {
    it('should display login page', () => {
      cy.visit('/login');
      cy.contains('Login to Your Account').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
    });

    it('should show validation errors for invalid inputs', () => {
      cy.visit('/login');
      cy.get('button[type="submit"]').click();
      
      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });

    it('should show error for invalid email format', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      
      cy.contains('Invalid email address').should('be.visible');
    });

    it('should login successfully with valid credentials', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('user@example.com');
      cy.get('input[name="password"]').type('Password123!');
      cy.get('button[type="submit"]').click();
      
      // Should redirect to dashboard
      cy.url().should('include', '/dashboard');
    });
  });

  describe('Signup', () => {
    it('should display signup page', () => {
      cy.visit('/signup');
      cy.contains('Create Your Account').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
    });

    it('should show validation errors for missing fields', () => {
      cy.visit('/signup');
      cy.get('button[type="submit"]').click();
      
      cy.contains('First name is required').should('be.visible');
      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });

    it('should show error when passwords do not match', () => {
      cy.visit('/signup');
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="email"]').type('john@example.com');
      cy.get('input[name="phone"]').type('1234567890');
      cy.get('input[name="password"]').type('Password123!');
      cy.get('input[name="confirmPassword"]').type('DifferentPassword123!');
      cy.get('button[type="submit"]').click();
      
      cy.contains('Passwords must match').should('be.visible');
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      // Login first
      cy.visit('/login');
      cy.get('input[name="email"]').type('user@example.com');
      cy.get('input[name="password"]').type('Password123!');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });

    it('should logout successfully', () => {
      cy.get('[aria-label="User menu"]').click();
      cy.contains('Logout').click();
      
      // Should redirect to home
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });
});
