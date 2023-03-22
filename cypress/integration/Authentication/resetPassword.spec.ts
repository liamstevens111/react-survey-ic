describe('Reset password', () => {
  context('upon navigation to /login', () => {
    it('clicking forgot password link navigates to reset password page', () => {
      cy.visit('/login');

      cy.get('a').contains('Forgot?').click();

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/reset-password');
      });
    });
  });

  context('upon navigation to /reset-password', () => {
    it('clicking on send recovery email displays sent message given valid email format', () => {
      cy.visit('/reset-password');

      cy.findByTestId('reset-password-header').should('be.visible');

      cy.get('button[type="submit"]').click();

      cy.get('.errors').should('be.visible');

      cy.get('input[name=email]').type('example_email@nimblehq.co');
      cy.get('button[type="submit"]').click();

      cy.get('.errors').should('not.be.visible');

      cy.findByText("We've emailed you instructions to reset your password").should('be.visible');
      cy.findByText('Check your email').should('be.visible');
    });
  });
});
