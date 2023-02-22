describe('User authentication', () => {
  context('upon naivation to /login', () => {
    it('displays login page', () => {
      cy.visit('/login');

      cy.findByTestId('login-header').should('be.visible');
    });
  });
});
