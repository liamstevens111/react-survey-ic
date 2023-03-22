import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import ResetPasswordScreen from '.';
import AuthAdapter from '../../adapters/authAdapter';

/* eslint-disable camelcase */
const commonPasswordResetParams = {
  user: {
    email: 'testemail@gmail.com',
  },
  client_id: process.env.REACT_APP_API_CLIENT_ID,
  client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
};

const commonResetPasswordResponse = {
  meta: {
    message:
      'If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.',
  },
};

/* eslint-enable camelcase */

describe('ResetPasswordScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    nock.cleanAll();
    nock.restore();
  });

  test('given an empty email in the form, displays error', async () => {
    const mockResetPassword = jest.spyOn(AuthAdapter, 'resetPassword');

    render(<ResetPasswordScreen />, { wrapper: BrowserRouter });

    const submitButton = screen.getByRole('button', { name: 'reset-password.recovery-email' });

    await userEvent.click(submitButton);

    expect(mockResetPassword).not.toBeCalled();

    expect(screen.getByText('login.invalid-email')).toBeInTheDocument();
  });

  test('given a valid email, displays instructions sent message', async () => {
    nock(`${process.env.REACT_APP_API_ENDPOINT}`)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Authorization',
      })
      .post('/passwords', {
        ...commonPasswordResetParams,
      })
      .reply(200, {
        ...commonResetPasswordResponse,
      });

    render(<ResetPasswordScreen />, { wrapper: BrowserRouter });

    const emailField = screen.getByLabelText('login.email');
    const submitButton = screen.getByRole('button', { name: 'reset-password.recovery-email' });

    await userEvent.type(emailField, 'testemail@gmail.com');

    expect(submitButton).not.toHaveAttribute('disabled');

    await userEvent.click(submitButton);

    expect(submitButton).toHaveAttribute('disabled');

    await Promise.resolve();

    await waitFor(() => {
      expect(screen.getByText('reset-password.check-email')).toBeInTheDocument();
    });
    expect(screen.getByText('reset-password.success-message')).toBeInTheDocument();
  });
});
