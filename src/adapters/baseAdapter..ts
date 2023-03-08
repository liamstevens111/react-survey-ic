import requestManager, { RequestParamsType } from 'lib/requestManager';

class BaseAdapter {
  static baseUrl = process.env.REACT_APP_API_ENDPOINT;

  getRequest(endpoint: string, requestOption: RequestParamsType) {
    return requestManager('GET', `${BaseAdapter.baseUrl}/${endpoint}`, requestOption);
  }

  postRequest(endpoint: string, requestOption: RequestParamsType) {
    return requestManager('POST', `${BaseAdapter.baseUrl}/${endpoint}`, requestOption);
  }
}

export default BaseAdapter;
