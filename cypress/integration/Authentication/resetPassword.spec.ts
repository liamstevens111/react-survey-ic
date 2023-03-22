describe('Reset password', () => {
  context('upon navigation to /login', () => {
    it('clicking forgot password link navigates to reset passowrd page', () => {
      cy.visit('/login');

      cy.get('a').contains('Forgot?').click();

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/reset-password');
      });
    });
  });
});
