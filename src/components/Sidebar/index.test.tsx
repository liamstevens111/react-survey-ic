/* eslint-disable camelcase */
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AuthAdapter from 'adapters/authAdapter';
import { User } from 'types/User';

import Sidebar from '.';
import { setItem } from '../../helpers/localStorage';

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

describe('Sidebar', () => {
  const user: User = { name: 'Test User', email: 'testemail@email.com', avatarUrl: 'an-avatar-url' };

  test("renders a sidebar on the page with the user's name, profile image", () => {
    render(<Sidebar user={user} />, { wrapper: BrowserRouter });

    expect(screen.getByTestId('username')).toHaveTextContent(user.name);

    const profileImage = screen.getByAltText('profile') as HTMLImageElement;
    expect(profileImage.src).toContain('an-avatar-url');
  });

  test('renders a sidebar on the page with a logout button that when clicked, calls Logout adapter', async () => {
    setItem('UserProfile', { auth: mockTokenData, user: mockUserProfileData });

    const mockLogout = jest.spyOn(AuthAdapter, 'logout');

    render(<Sidebar user={user} />, { wrapper: BrowserRouter });

    const submitButton = screen.getByRole('button', { name: 'Logout' });

    await userEvent.click(submitButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});
