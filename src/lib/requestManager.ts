import axios, { Method as HTTPMethod, ResponseType, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import SurveyAdapter from 'adapters/surveyAdapter';
import { setItem, getItem, clearItem } from 'helpers/localStorage';

import { LOGIN_URL } from '../constants';

export const defaultOptions: { responseType: ResponseType } = {
  responseType: 'json',
};

export function createRequestSuccessInterceptor() {
  return function (config: AxiosRequestConfig) {
    const userProfile = getItem('UserProfile');

    if (userProfile?.auth?.access_token) {
      config.headers.Authorization = `Bearer ${userProfile.auth.access_token}`;
    }
    return config;
  };
}

export function createResponseErrorInterceptor() {
  return async function (error: AxiosError) {
    if (error.response?.status === 401) {
      const userProfile = getItem('UserProfile');

      clearItem('UserProfile');

      if (userProfile?.auth?.refresh_token) {
        try {
          const response = await SurveyAdapter.loginWithRefreshToken(userProfile.auth.refresh_token);

          const { attributes: authInfo } = await response.data;

          setItem('UserProfile', { ...userProfile, auth: authInfo });

          error.config.headers.Authorization = `Bearer ${authInfo.accessToken}`;
          return axios.request(error.config);
        } catch {
          window.location.href = LOGIN_URL;
        }
      }

      window.location.href = LOGIN_URL;
    }

    return Promise.reject(error);
  };
}

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

  axios.interceptors.request.use(createRequestSuccessInterceptor(), function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    return response;
  }, createResponseErrorInterceptor());

  return axios.request(requestParams).then((response: AxiosResponse) => {
    return response.data;
  });
};

export default requestManager;
