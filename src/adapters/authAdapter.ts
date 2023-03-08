import BaseAdapter from './baseAdapter.';

type LoginAuthType = {
  email: string;
  password: string;
};

class AuthAdapter extends BaseAdapter {
  static login(params: LoginAuthType) {
    /* eslint-disable camelcase */
    const requestParams = {
      ...params,
      grant_type: 'password',
      client_id: process.env.REACT_APP_API_CLIENT_ID,
      client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
    };
    /* eslint-enable camelcase */

    return this.prototype.postRequest('oauth/token', { data: requestParams });
  }
}

export default AuthAdapter;
