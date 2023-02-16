import requestManager, { RequestParamsType } from 'lib/requestManager';

class BaseAdapter {
  getRequest(endpoint: string, params: RequestParamsType) {
    return requestManager('GET', endpoint, params);
  }

  postRequest(endpoint: string, params: RequestParamsType) {
    return requestManager('POST', endpoint, params);
  }
}

export default BaseAdapter;
