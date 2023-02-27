describe('Cypress', () => {
  it('is working', () => {
    expect(true).to.equal(true);
  });

  it('visits the app', () => {
    cy.visit('/');

    cy.findByTestId('app-main-heading').should('be.visible');
  });
});
