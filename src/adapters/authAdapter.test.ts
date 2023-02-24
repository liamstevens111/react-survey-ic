import nock from 'nock';

import AuthAdapter, { commonParams } from './authAdapter';

/* eslint-disable camelcase */
const mockLoginCredentials = {
  email: 'testemail@gmail.com',
  password: 'password123',
};

describe('AuthAdapter', () => {
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
          ...commonParams,
          grant_type: 'password',
        })
        .reply(200);

      expect(scope.isDone()).toBe(false);
      await AuthAdapter.loginWithEmailPassword({ ...mockLoginCredentials });
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
          ...commonParams,
          grant_type: 'refresh_token',
        })
        .reply(200);

      expect(scope.isDone()).toBe(false);
      await AuthAdapter.loginWithRefreshToken('refresh_token');
      expect(scope.isDone()).toBe(true);
    });
  });
});
