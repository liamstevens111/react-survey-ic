import requestManager, { RequestParamsType } from 'lib/requestManager';

class BaseAdapter {
  static baseUrl = process.env.REACT_APP_API_ENDPOINT;

  getRequest(endpoint: string, params: RequestParamsType) {
    return requestManager('GET', `${BaseAdapter.baseUrl}/${endpoint}`, params);
  }

  postRequest(endpoint: string, params: RequestParamsType) {
    return requestManager('POST', `${BaseAdapter.baseUrl}/${endpoint}`, params);
  }
}

export default BaseAdapter;
