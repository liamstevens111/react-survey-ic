import axios, { Method as HTTPMethod, ResponseType, AxiosRequestConfig, AxiosResponse } from 'axios';

import AuthAdapter from 'adapters/authAdapter';
import { setToken, getToken, clearToken } from 'helpers/userToken';

import { LOGIN_URL } from '../constants';

export const defaultOptions: { responseType: ResponseType } = {
  responseType: 'json',
};

export type RequestParamsType = AxiosRequestConfig;

/**
 * The main API access function that comes preconfigured with useful defaults.
 *
 * @param {string} [method] - the HTTP method to use
 * @param {string} [endpoint] - the API endpoint to use
 * @param {Object} [requestOptions] - params and date to be sent
 * @return {Promise} a Promise that will resolve into an object or reject with
 *                   an error object for its reason
 */

const requestManager = (
  method: HTTPMethod,
  endpoint: string,
  requestOptions: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  const requestParams: AxiosRequestConfig = {
    method,
    url: endpoint,
    ...defaultOptions,
    ...requestOptions,
  };

  axios.interceptors.request.use(
    function (config) {
      const userToken = getToken();

      if (userToken?.access_token) {
        config.headers.Authorization = `Bearer ${userToken.access_token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (error.response?.status === 401) {
        const userToken = getToken();

        clearToken();

        if (userToken?.refresh_token) {
          try {
            const response = await AuthAdapter.loginWithRefreshToken(userToken.refresh_token);

            const {
              attributes: { access_token: accessToken, refresh_token: refreshToken },
            } = await response.data;

            /* eslint-disable camelcase */
            setToken({ access_token: accessToken, refresh_token: refreshToken });
            /* eslint-enable camelcase */

            error.config.headers.Authorization = `Bearer ${accessToken}`;
            return axios.request(error.config);
          } catch {
            window.location.href = LOGIN_URL;
          }
        }

        window.location.href = LOGIN_URL;
      }

      return Promise.reject(error);
    }
  );

  return axios.request(requestParams).then((response: AxiosResponse) => {
    return response.data;
  });
};

export default requestManager;
