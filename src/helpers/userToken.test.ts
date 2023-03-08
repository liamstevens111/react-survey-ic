import { setToken, getToken } from './userToken';

/* eslint-disable camelcase */
describe('setToken', () => {
  test('Given a valid UserToken, sets it in LocalStorage', () => {
    const testToken = { access_token: 'access_token', refresh_token: 'refesh_token' };

    setToken(testToken);

    expect(JSON.parse(localStorage.getItem('UserToken') as string)).toStrictEqual(testToken);
  });
});

describe('getToken', () => {
  test('Given an existing UserToken in LocalStorage, returns the value', () => {
    const testToken = { access_token: 'access_token', refresh_token: 'refesh_token' };

    localStorage.setItem('UserToken', JSON.stringify(testToken));

    expect(getToken()).toStrictEqual(testToken);

    localStorage.clear();
  });

  test('Given a NON-existing UserToken in LocalStorage, returns an empty object', () => {
    expect(getToken()).toEqual({});
  });
});
/* eslint-enable camelcase */
