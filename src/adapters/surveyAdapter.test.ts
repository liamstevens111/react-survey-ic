import nock from 'nock';

import SurveyAdapter, { OauthParams } from './surveyAdapter';

/* eslint-disable camelcase */
const mockLoginCredentials = {
  email: 'testemail@gmail.com',
  password: 'password123',
};

const commonUserProfileResponse = {
  data: {
    id: '1',
    type: 'user',
    attributes: {
      email: 'testemail@gmail.com',
      name: 'TestName',
      avatar_url: 'https://secure.gravatar.com/avatar/6733d09432e89459dba795de8312ac2d',
    },
  },
};

describe('SurveyAdapter', () => {
  afterAll(() => {
    nock.cleanAll();
    nock.restore();
  });

  describe('loginWithEmailPassword', () => {
    test('The login endpoint is called with credientials from the request', async () => {
      const scope = nock(`${process.env.REACT_APP_API_ENDPOINT}`)
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
        })
        .post('/oauth/token', {
          ...mockLoginCredentials,
          ...OauthParams,
          grant_type: 'password',
        })
        .reply(200);

      expect(scope.isDone()).toBe(false);
      await SurveyAdapter.loginWithEmailPassword({ ...mockLoginCredentials });
      expect(scope.isDone()).toBe(true);
    });
  });

  describe('loginWithRefreshToken', () => {
    test('The refresh token endpoint is called with refresh token from the request', async () => {
      const scope = nock(`${process.env.REACT_APP_API_ENDPOINT}`)
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
        })
        .post('/oauth/token', {
          refresh_token: 'refresh_token',
          ...OauthParams,
          grant_type: 'refresh_token',
        })
        .reply(200);

      expect(scope.isDone()).toBe(false);
      await SurveyAdapter.loginWithRefreshToken('refresh_token');
      expect(scope.isDone()).toBe(true);
    });
  });

  describe('getUser', () => {
    test('The user profile endpoint is called and returns user information', async () => {
      const scope = nock(`${process.env.REACT_APP_API_ENDPOINT}`)
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
        })
        .get('/me')
        .reply(200, { ...commonUserProfileResponse });

      expect(scope.isDone()).toBe(false);
      expect(await SurveyAdapter.getUser()).toEqual({ ...commonUserProfileResponse });
      expect(scope.isDone()).toBe(true);
    });
  });

  describe('logout', () => {
    test('The logout endpoint is called', async () => {
      const token = 'access_token';

      const scope = nock(`${process.env.REACT_APP_API_ENDPOINT}`)
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
        })
        .post('/oauth/revoke')
        .reply(200);

      expect(scope.isDone()).toBe(false);
      expect(await AuthAdapter.logout(token));
      expect(scope.isDone()).toBe(true);
    });
  });

  describe('resetPassword', () => {
    test('The resetPassword endpoint is called', async () => {
      const scope = nock(`${process.env.REACT_APP_API_ENDPOINT}`)
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
        })
        .post('/passwords')
        .reply(200);

      expect(scope.isDone()).toBe(false);
      expect(await AuthAdapter.resetPassword(mockLoginCredentials.email));
      expect(scope.isDone()).toBe(true);
    });
  });
});
