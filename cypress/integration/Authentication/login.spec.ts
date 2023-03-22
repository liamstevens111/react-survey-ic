describe('Login', () => {
  context('upon navigation to /login', () => {
    it('displays login page', () => {
      cy.visit('/login');

      cy.findByTestId('login-header').should('be.visible');
    });
  });

  context('login with email and password', () => {
    it('given correct credentials, redirects to the home page, shows user header', () => {
      cy.intercept('POST', 'api/v1/oauth/token', {
        statusCode: 200,
        fixture: 'Authentication/valid-credentials.json',
      });

      cy.intercept('GET', '/api/v1/me', { statusCode: 200, fixture: 'Authentication/logged-in-user.json' });

      cy.visit('/login');

      cy.get('input[name=email]').type('example_email@nimblehq.co');
      cy.get('input[name=password]').type('ValidPassword');
      cy.get('button[type="submit"]').click();

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/');
      });

      cy.findByTestId('app-main-heading').should('be.visible');

      cy.findByTestId('header-avatar').should('have.attr', 'src', 'valid_avatar_url');
    });

    it('given INCORRECT credentials, shows login error, does NOT show user header', () => {
      cy.intercept('POST', 'api/v1/oauth/token', {
        statusCode: 400,
        fixture: 'Authentication/invalid-credentials.json',
      });

      cy.visit('/login');

      cy.get('input[name=email]').type('example_email@nimblehq.co');
      cy.get('input[name=password]').type('InvalidPassword');
      cy.get('button[type="submit"]').click();

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/login');
      });

      cy.get('.errors').should('be.visible');

      cy.get('.errors').within(() => {
        cy.findByText('Your email or password is incorrect. Please try again.').should('exist');
      });

      cy.findByTestId('app-main-heading').should('not.exist');
      cy.findByTestId('header-avatar').should('not.exist');
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
