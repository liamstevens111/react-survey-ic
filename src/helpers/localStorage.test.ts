import { setItem, getItem, clearItem } from './localStorage';

/* eslint-disable camelcase */
describe('setItem', () => {
  test('Given a valid UserToken, sets it in LocalStorage', () => {
    const testToken = { access_token: 'access_token', refresh_token: 'refesh_token' };

    setItem('UserProfile', testToken);

    expect(JSON.parse(localStorage.getItem('UserProfile') as string)).toStrictEqual(testToken);
  });
});

describe('getItem', () => {
  test('Given an existing UserToken in LocalStorage, returns the value', () => {
    const testToken = { access_token: 'access_token', refresh_token: 'refesh_token' };

    localStorage.setItem('UserProfile', JSON.stringify(testToken));

    expect(getItem('UserProfile')).toStrictEqual(testToken);

    localStorage.clear();
  });

  test('Given a NON-existing UserToken in LocalStorage, returns null', () => {
    expect(getItem('UserProfile')).toBeNull();
  });
});

describe('clearItem', () => {
  test('Given an existing UserToken in LocalStorage, removes the value', () => {
    const testToken = { access_token: 'access_token', refresh_token: 'refesh_token' };

    localStorage.setItem('UserProfile', JSON.stringify(testToken));

    expect(JSON.parse(localStorage.getItem('UserProfile') as string)).toStrictEqual(testToken);

    clearItem('UserProfile');

    expect(JSON.parse(localStorage.getItem('UserProfile') as string)).toBeNull();
  });
});
/* eslint-enable camelcase */
