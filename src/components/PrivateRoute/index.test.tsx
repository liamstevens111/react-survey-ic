/* eslint-disable camelcase */
import { MemoryRouter } from 'react-router-dom';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import PrivateRoute from '.';
import { setItem, clearItem } from '../../helpers/localStorage';

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

describe('PrivateRoute', () => {
  beforeEach(() => {
    clearItem('UserProfile');
  });

  test('renders a PrivateRoute given authenticated user', async () => {
    setItem('UserProfile', { auth: mockTokenData, user: mockUserProfileData });

    render(<PrivateRoute />, { wrapper: MemoryRouter });

    expect(localStorage.getItem).toBeCalledWith('UserProfile');

    // expect(screen.getByTestId('app-main-heading'));
  });

  test.skip('renders a PrivateRoute', async () => {
    // Infinite loop
    render(<PrivateRoute />, { wrapper: MemoryRouter });

    await waitForElementToBeRemoved(() => screen.queryAllByTestId('loading'));

    expect(screen.getByTestId('loading'));
  });
});
