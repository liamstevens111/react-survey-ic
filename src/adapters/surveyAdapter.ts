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
class SurveyAdapter extends BaseAdapter {
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

  static logout(accessToken: string) {
    /* eslint-disable camelcase */
    const requestParams = {
      ...commonParams,
      token: accessToken,
    };
    /* eslint-enable camelcase */

    return this.prototype.postRequest('oauth/revoke', { data: requestParams });
  }

  static resetPassword(email: string) {
    const requestParams = {
      ...commonParams,
      user: { email: email },
    };

    return this.prototype.postRequest('passwords', { data: requestParams });
  }

  static getUser() {
    return this.prototype.getRequest('me', {});
  }

  static list() {
    return this.prototype.getRequest('surveys', {});
  }
}

export default SurveyAdapter;
