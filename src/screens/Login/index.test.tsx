import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import LoginScreen from '.';
import AuthAdapter from '../../adapters/authAdapter';

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
      ...mockTokenData,
    },
  },
};

const commonUserProfileResponse = {
  data: {
    id: '1',
    type: 'user',
    attributes: {
      email: 'testemail@gmail.com',
      name: 'TestName',
      avatar_url: 'https://secure.gravatar.com/avatar/6733d09432e89459dba795de8312ac2d',
    },
  },
};

const testCredentials = {
  email: 'testemail@gmail.com',
  password: 'password123',
};

const useNavigateMock = jest.fn();

/* eslint-enable camelcase */

describe('LoginScreen', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    nock.cleanAll();
    nock.restore();
  });

  test('given an empty email and password in the login form, displays both errors', async () => {
    const mockLogin = jest.spyOn(AuthAdapter, 'loginWithEmailPassword');

    render(<LoginScreen />, { wrapper: BrowserRouter });

    const submitButton = screen.getByRole('button', { name: 'login.sign-in' });

    await userEvent.click(submitButton);

    expect(mockLogin).not.toBeCalled();

    expect(screen.getByText('login.invalid-email')).toBeInTheDocument();
    expect(screen.getByText('login.invalid-password')).toBeInTheDocument();
  });

  test('given correct credentials, stores tokens in LocalStorage and redirects to the home page', async () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => useNavigateMock);

    nock(`${process.env.REACT_APP_API_ENDPOINT}`)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Authorization',
      })
      .post('/oauth/token', {
        ...commonLoginParams,
        ...testCredentials,
      })
      .reply(200, {
        ...commonLoginResponse,
      })
      .options('/me')
      .reply(204)
      .get('/me')
      .reply(200, { ...commonUserProfileResponse });

    render(<LoginScreen />, { wrapper: BrowserRouter });

    const emailField = screen.getByLabelText('login.email');
    const passwordField = screen.getByLabelText('login.password');
    const submitButton = screen.getByRole('button', { name: 'login.sign-in' });

    await userEvent.type(emailField, testCredentials.email);
    await userEvent.type(passwordField, testCredentials.password);

    expect(submitButton).not.toHaveAttribute('disabled');

    await userEvent.click(submitButton);

    expect(submitButton).toHaveAttribute('disabled');

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        'UserProfile',
        JSON.stringify({ auth: mockTokenData, user: mockUserProfileData })
      );
    });

    await waitFor(() => {
      expect(useNavigateMock).toHaveBeenCalledWith('/');
    });
  });

  test('given INCORRECT credentials, displays the error from the API response', async () => {
    const mockLogin = jest.spyOn(AuthAdapter, 'loginWithEmailPassword');

    render(<LoginScreen />, { wrapper: BrowserRouter });

    nock(`${process.env.REACT_APP_API_ENDPOINT}`)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
      })
      .post('/oauth/token', {
        ...commonLoginParams,
        ...testCredentials,
      })
      .reply(400, {
        errors: [
          {
            detail: 'Your email or password is incorrect. Please try again.',
            code: 'invalid_email_or_password',
          },
        ],
      });

    const emailField = screen.getByLabelText('login.email');
    const passwordField = screen.getByLabelText('login.password');
    const submitButton = screen.getByRole('button', { name: 'login.sign-in' });

    await userEvent.type(emailField, testCredentials.email);
    await userEvent.type(passwordField, testCredentials.password);

    await userEvent.click(submitButton);

    expect(mockLogin).toBeCalled();

    await waitFor(() => {
      expect(localStorage.setItem).not.toHaveBeenLastCalledWith('UserProfile', JSON.stringify({ ...mockTokenData }));
    });

    await waitFor(() => {
      expect(screen.getByText('Your email or password is incorrect. Please try again.')).toBeInTheDocument();
    });
  });
});
