/* eslint-disable camelcase */

import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import LoginScreen from '.';

const commonLoginParams = {
  grant_type: 'password',
  client_id: process.env.REACT_APP_API_CLIENT_ID,
  client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
};

const commonLoginResponse = {
  data: {
    id: '18339',
    type: 'token',
    attributes: {
      access_token: 'test_access_token',
      token_type: 'Bearer',
      expires_in: 7200,
      refresh_token: 'test_refresh_token',
      created_at: 1677045997,
    },
  },
};

const testCredentials = {
  email: 'testemail@gmail.com',
  password: 'password123',
};

const useNavigateMock = jest.fn();

describe('LoginScreen', () => {
  afterAll(() => {
    nock.cleanAll();
    nock.restore();

    jest.restoreAllMocks();
  });

  test('given an empty email and password in the login form, displays both errors', async () => {
    render(<LoginScreen />, { wrapper: BrowserRouter });

    const submitButton = screen.getByRole('button', { name: 'login.sign-in' });

    await userEvent.click(submitButton);

    expect(screen.getByText('login.invalid-email')).toBeInTheDocument();
    expect(screen.getByText('login.invalid-password')).toBeInTheDocument();
  });

  test('given correct credentials, redirects to the home page', async () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => useNavigateMock);

    nock(`${process.env.REACT_APP_API_ENDPOINT}`)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
      })
      .post('/oauth/token', {
        ...commonLoginParams,
        ...testCredentials,
      })
      .reply(200, {
        ...commonLoginResponse,
      });

    render(<LoginScreen />, { wrapper: BrowserRouter });

    const emailField = screen.getByLabelText('login.email');
    const passwordField = screen.getByLabelText('login.password');
    const submitButton = screen.getByRole('button', { name: 'login.sign-in' });

    await userEvent.type(emailField, testCredentials.email);
    await userEvent.type(passwordField, testCredentials.password);

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(useNavigateMock).toHaveBeenCalledWith('/');
    });
  });

  test('given INCORRECT credentials, displays the error from API response', async () => {
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

    await waitFor(() => {
      expect(screen.getByText('Your email or password is incorrect. Please try again.')).toBeInTheDocument();
    });
  });
});
