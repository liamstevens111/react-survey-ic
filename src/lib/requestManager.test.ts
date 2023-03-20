import axios from 'axios';

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

const mockTokenData = {
  access_token: 'test_access_token',
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

/* eslint-enable camelcase */

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

    delete global.window.location;
    window.location = {};
    Object.defineProperty(window, 'location', {
      value: {
        href: windowHref,
      },
    });
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
      console.log(err);
      expect(err).toBe(errorResponse);
      expect(window.location.href).toEqual(LOGIN_URL);
    }
  });
});
