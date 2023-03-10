import { getItem } from 'helpers/localStorage';

import BaseAdapter from './baseAdapter.';

/* eslint-disable camelcase */
export const commonParams = {
  access_token: getItem('UserProfile')?.auth?.access_token,
};
/* eslint-enable camelcase */

class SurveyAdapter extends BaseAdapter {
  static list() {
    const requestParams = {
      ...commonParams,
    };

    return this.prototype.getRequest('surveys', { data: requestParams });
  }
}

export default SurveyAdapter;
