describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  describe('Login', () => {
    it('should display login form', () => {
      cy.visit('/login');
      cy.get('h1').should('contain', 'Welcome Back');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Login');
    });
    
    it('should show validation errors for empty fields', () => {
      cy.visit('/login');
      cy.get('button[type="submit"]').click();
      cy.get('p').should('contain', 'Email is required');
      cy.get('p').should('contain', 'Password is required');
    });
    
    it('should login successfully with valid credentials', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('Password123!');
      cy.get('button[type="submit"]').click();
      
      // Should redirect to dashboard
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome back').should('be.visible');
    });
  });
  
  describe('Signup', () => {
    it('should display signup form', () => {
      cy.visit('/signup');
      cy.get('h1').should('contain', 'Create Account');
      cy.get('input[name="name"]').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Sign Up');
    });
    
    it('should validate password strength', () => {
      cy.visit('/signup');
      cy.get('input[name="password"]').type('weak');
      cy.get('input[name="password"]').blur();
      cy.get('p').should('contain', 'Password must be at least 8 characters');
    });
  });
  
  describe('Logout', () => {
    it('should logout user successfully', () => {
      // Login first
      cy.visit('/login');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('Password123!');
      cy.get('button[type="submit"]').click();
      
      // Logout
      cy.get('[aria-label="User menu"]').click();
      cy.contains('Logout').click();
      
      // Should redirect to login
      cy.url().should('include', '/login');
    });
  });
});