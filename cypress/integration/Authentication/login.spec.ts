describe('User Authentication', () => {
  context('upon navigation to /login', () => {
    it('displays login page', () => {
      cy.visit('/login');

      cy.findByTestId('login-header').should('be.visible');
    });
  });

  context('login with email and password', () => {
    it('given correct credentials, redirects to the home page', () => {
      cy.intercept('POST', '/oauth/token/', {
        statusCode: 200,
        fixture: 'Authentication/valid-credentials.json',
      });

      cy.visit('/login');

      cy.get('input[name=email]').type('liam@nimblehq.co');
      cy.get('input[name=password]').type('12345678');
      cy.get('button[type="submit"]').click();

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/');
      });
    });

    it('given INCORRECT credentials, shows login error', () => {
      cy.intercept('POST', '/oauth/token/', {
        statusCode: 400,
        fixture: 'Authentication/invalid-credentials.json',
      });

      cy.visit('/login');

      cy.get('input[name=email]').type('testemail@gmail.com');
      cy.get('input[name=password]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/login');
      });

      cy.get('.errors').should('be.visible');

      cy.get('.errors').within(() => {
        cy.findByText('Your email or password is incorrect. Please try again.').should('exist');
      });
    });

    it('given NO credentials entered, shows field validation errors', () => {
      cy.visit('/login');

      cy.get('button[type="submit"]').click();

      cy.get('.errors').should('be.visible');

      cy.get('.errors').within(() => {
        cy.contains('Email has invalid format');
        cy.contains('Password should be at least');
      });
    });
  });
});
