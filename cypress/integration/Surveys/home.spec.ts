import { setItem } from '../../../src/helpers/localStorage';
/* eslint-disable camelcase */
const mockTokenData = {
  access_token: 'test_access_token',
  refresh_token: 'test_refresh_token',
  token_type: 'Bearer',
  expires_in: 7200,
  created_at: 1677045997,
};

const mockUserProfileData = {
  email: 'testemail@gmail.com',
  name: 'TestName',
  avatar_url: 'https://secure.gravatar.com/avatar/6733d09432e89459dba795de8312ac2d',
};

// TODO: Add test for expired token for surveys are shown on home page (a further authenticated request required)
describe('Home', () => {
  context('Authentication token', () => {
    it('with user tokens, displays home page and user header', () => {
      setItem('UserProfile', { auth: mockTokenData, user: mockUserProfileData });

      cy.visit('/');

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/');
      });

      cy.findByTestId('app-main-heading').should('be.visible');

      cy.findByText('Home Screen').should('exist');
      cy.findByText('Home Screen').should('be.visible');
    });

    it('WITHOUT user tokens, redirects to the login page', () => {
      cy.visit('/');

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/login');
      });

      cy.findByTestId('app-main-heading').should('not.exist');

      cy.findByText('Home Screen').should('not.exist');
    });
  });
});
