import nock from 'nock';

import AuthAdapter from './authAdapter';

/* eslint-disable camelcase */
const testCredentials = {
  email: 'testemail@gmail.com',
  password: 'password123',
};

const commonLoginParams = {
  grant_type: 'password',
  client_id: process.env.REACT_APP_API_CLIENT_ID,
  client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
};
/* eslint-enable camelcase */

describe('AuthAdapter', () => {
  afterAll(() => {
    nock.cleanAll();
    nock.restore();
  });

  describe('login', () => {
    test('The login endpoint is called with credientials from the request', async () => {
      const scope = nock(`${process.env.REACT_APP_API_ENDPOINT}`)
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
        })
        .post('/oauth/token', {
          ...testCredentials,
          ...commonLoginParams,
        })
        .reply(200);

      expect(scope.isDone()).toBe(false);
      await AuthAdapter.login({ ...testCredentials });
      expect(scope.isDone()).toBe(true);
    });
  });
});
