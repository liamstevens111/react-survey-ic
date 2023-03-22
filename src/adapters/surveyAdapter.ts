import BaseAdapter from './baseAdapter.';

type LoginAuthType = {
  email: string;
  password: string;
};

/* eslint-disable camelcase */
export const OauthParams = {
  client_id: process.env.REACT_APP_API_CLIENT_ID,
  client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
};
/* eslint-enable camelcase */
class SurveyAdapter extends BaseAdapter {
  static loginWithEmailPassword(authParams: LoginAuthType) {
    /* eslint-disable camelcase */
    const requestParams = {
      ...OauthParams,
      ...authParams,
      grant_type: 'password',
    };
    /* eslint-enable camelcase */

    return this.prototype.postRequest('oauth/token', { data: requestParams });
  }

  static refreshAccessToken(refreshToken: string) {
    /* eslint-disable camelcase */
    const requestParams = {
      ...OauthParams,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    };
    /* eslint-enable camelcase */

    return this.prototype.postRequest('oauth/token', { data: requestParams });
  }

  static logout(accessToken: string) {
    /* eslint-disable camelcase */
    const requestParams = {
      ...OauthParams,
      token: accessToken,
    };
    /* eslint-enable camelcase */

    return this.prototype.postRequest('oauth/revoke', { data: requestParams });
  }

  static resetPassword(email: string) {
    const requestParams = {
      ...OauthParams,
      user: { email: email },
    };

    return this.prototype.postRequest('passwords', { data: requestParams });
  }

  static getUser() {
    return this.prototype.getRequest('me', {});
  }

  static list(page: number) {
    return this.prototype.getRequest(`surveys?page[number]=${page}`, {});
  }
}

export default SurveyAdapter;
