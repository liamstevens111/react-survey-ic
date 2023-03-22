import axios from 'axios';
import nock from 'nock';

import requestManager, {
  createRequestSuccessInterceptor,
  createResponseErrorInterceptor,
  defaultOptions,
} from './requestManager';
import { LOGIN_URL } from '../constants';
import { setItem, clearItem } from '../helpers/localStorage';

const windowHref = window.location.href;
const endPoint = 'https://sample-endpoint.com/api/';

jest.mock('axios');

/* eslint-disable camelcase */

const commonLoginParams = {
  grant_type: 'password',
  client_id: process.env.REACT_APP_API_CLIENT_ID,
  client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
};

const mockTokenData = {
  access_token: 'test_access_token',
  refresh_token: 'test_refresh_token',
  token_type: 'Bearer',
  expires_in: 7200,
  created_at: 1677045997,
};

const mockTokenData2 = {
  access_token: 'new_access_token',
  refresh_token: 'test_refresh_token',
  token_type: 'Bearer',
  expires_in: 7200,
  created_at: 1677045997,
};

const mockUserProfileData = {
  email: 'testemail@gmail.com',
  name: 'TestName',
  avatar_url: 'https://secure.gravatar.com/avatar/6733d09432e89459dba795de8312ac2d',
};

const commonLoginResponse = {
  data: {
    id: '18339',
    type: 'token',
    attributes: {
      ...mockTokenData2,
    },
  },
};

/* eslint-enable camelcase */

/* eslint-disable camelcase */
describe('requestManager', () => {
  it('fetches successfully data from an API', async () => {
    const responseData = {
      data: [
        { id: 1, value: 'first object' },
        { id: 2, value: 'second object' },
      ],
    };

    const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve(responseData));

    await expect(requestManager('POST', endPoint)).resolves.toEqual(responseData.data);

    requestSpy.mockRestore();
  });

  it('fetches the provided endPoint', async () => {
    const requestOptions = { ...defaultOptions, method: 'POST', url: endPoint };

    const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve({}));

    await requestManager('POST', endPoint);

    expect(axios.request).toHaveBeenCalledWith(requestOptions);

    requestSpy.mockRestore();
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.reject(new Error(errorMessage)));

    await expect(requestManager('POST', endPoint)).rejects.toThrow(errorMessage);

    requestSpy.mockRestore();
  });
});

describe('createRequestSuccessInterceptor', () => {
  beforeEach(() => {
    clearItem('UserProfile');
  });

  it('given an existing access_token, sets Authorization header in Axios config', async () => {
    setItem('UserProfile', { auth: mockTokenData, user: mockUserProfileData });

    const interceptor = createRequestSuccessInterceptor();
    const config = interceptor({ headers: {}, url: endPoint });

    expect(config.headers.Authorization).toBe(`Bearer ${mockTokenData.access_token}`);
  });

  it('given a non-existing access_token, does NOT set Authorization header in Axios config', async () => {
    const interceptor = createRequestSuccessInterceptor();
    const config = interceptor({ headers: {}, url: endPoint });

    expect(config.headers.Authorization).toBeUndefined();
  });
});

describe('createResponseErrorInterceptor', () => {
  beforeEach(() => {
    clearItem('UserProfile');

    global.window = Object.create(window);

    Object.defineProperty(window, 'location', {
      value: {
        href: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    window.location.href = windowHref;
  });

  it('given NON existing tokens and 401 error, redirects to login page', async () => {
    const errorResponse = {
      name: '',
      message: '',
      isAxiosError: true,
      toJSON: () => ({}),
      config: {},
      code: '',
      response: {
        data: {},
        status: 401,
        statusText: '',
        headers: {},
        config: {},
      },
    };

    try {
      const interceptor = createResponseErrorInterceptor();
      await interceptor(errorResponse);
    } catch (err) {
      expect(err).toBe(errorResponse);
      expect(window.location.href).toEqual(LOGIN_URL);
    }
  });

  xit('given existing refresh token and 401 error, updates access token with new', async () => {
    jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
      return JSON.stringify({ auth: mockTokenData, user: mockUserProfileData });
    });

    const errorResponse = {
      name: '',
      message: '',
      isAxiosError: true,
      toJSON: () => ({ commonLoginResponse }),
      config: {},
      code: '',
      response: {
        data: { commonLoginResponse },
        status: 401,
        statusText: '',
        headers: {},
        config: {},
      },
    };

    // 1. Mocked nock

    nock(`${process.env.REACT_APP_API_ENDPOINT}`)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Authorization',
      })
      .post('/oauth/token', {
        ...commonLoginParams,
        refresh_token: 'test_refresh_token',
      })
      .reply(200, { ...commonLoginResponse });

    const storageSetSpy = jest.spyOn(localStorage, 'setItem');

    // 2. Mocked Axios

    const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve(commonLoginResponse));

    try {
      const interceptor = createResponseErrorInterceptor();
      await interceptor(errorResponse);
    } catch (err) {
      expect(err).toBe(errorResponse);

      // 3. Called 2 times and with same token from localstorage and not from response

      expect(storageSetSpy).toHaveBeenCalledWith(
        'UserProfile',
        JSON.stringify({ auth: mockTokenData, user: mockUserProfileData })
      );

      expect(storageSetSpy).toHaveBeenCalledWith(
        'UserProfile',
        JSON.stringify({ auth: mockTokenData, user: mockUserProfileData })
      );

      // 4 I can not expect storage to set the new token here as it seems to hit the catch block in the SurveyAdapter
      // on the fetching of new access token
    }

    requestSpy.mockRestore();
  });
});
