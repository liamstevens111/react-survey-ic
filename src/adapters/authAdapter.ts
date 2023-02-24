import BaseAdapter from './baseAdapter.';

type LoginAuthType = {
  email: string;
  password: string;
};

/* eslint-disable camelcase */
export const commonParams = {
  client_id: process.env.REACT_APP_API_CLIENT_ID,
  client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
};
/* eslint-enable camelcase */
class AuthAdapter extends BaseAdapter {
  static loginWithEmailPassword(authParams: LoginAuthType) {
    /* eslint-disable camelcase */
    const requestParams = {
      ...commonParams,
      ...authParams,
      grant_type: 'password',
    };
    /* eslint-enable camelcase */

    return this.prototype.postRequest('oauth/token', { data: requestParams });
  }

  static loginWithRefreshToken(refreshToken: string) {
    /* eslint-disable camelcase */
    const requestParams = {
      ...commonParams,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    };
    /* eslint-enable camelcase */

    return this.prototype.postRequest('oauth/token', { data: requestParams });
  }
}

export default AuthAdapter;
