import { BrowserRouter } from 'react-router-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import LoginScreen from '.';

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});

describe('LoginScreen', () => {
  test('submit an an empty email and password and receive errors', async () => {
    render(<LoginScreen />, { wrapper: BrowserRouter });

    const submitButton = screen.getByRole('button', { name: 'login.sign-in' });

    await userEvent.click(submitButton);

    expect(screen.getByText('login.invalid-email')).toBeInTheDocument();
    expect(screen.getByText('login.invalid-password')).toBeInTheDocument();
  });

  test('submit incorrect details', async () => {
    render(<LoginScreen />, { wrapper: BrowserRouter });

    const formData = {
      email: 'testemail@gmail.com',
      password: 'password123',
    };

    nock(`${process.env.REACT_APP_API_ENDPOINT}`)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
      })
      .post('/oauth/token', {
        email: formData.email,
        password: formData.password,
        grant_type: 'password',
        client_id: process.env.REACT_APP_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
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

    await userEvent.type(emailField, formData.email);
    await userEvent.type(passwordField, formData.password);

    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Your email or password is incorrect. Please try again.')).toBeInTheDocument();
    });
  });

  // test('Allows form submission of email and password', async () => {
  //   const requestData = {
  //     email: 'testemail@gmail.com',
  //     password: 'password123',
  //   };

  //   render(<LoginScreen />, { wrapper: BrowserRouter });

  //   const emailField = screen.getByLabelText('login.email');
  //   const passwordField = screen.getByLabelText('login.password');
  //   const submitButton = screen.getByRole('button', { name: 'login.sign-in' });

  //   await userEvent.type(emailField, 'testemail@gmail.com');
  //   await userEvent.type(passwordField, 'password123');

  //   const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve({}));

  //   await userEvent.click(submitButton);

  //   expect(axios.request).toHaveBeenCalledWith(requestData);

  //   requestSpy.mockRestore();
  // });
});
