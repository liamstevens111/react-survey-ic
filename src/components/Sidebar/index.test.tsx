/* eslint-disable camelcase */
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AuthAdapter from 'adapters/authAdapter';
import { User } from 'types/User';

import Sidebar from '.';
import * as myStorage from '../../helpers/localStorage';

const mockUserProfileData = {
  email: 'testemail@gmail.com',
  name: 'TestName',
  avatar_url: 'https://secure.gravatar.com/avatar/6733d09432e89459dba795de8312ac2d',
};

const mockTokenData = {
  access_token: 'test_access_token',
  refresh_token: 'test_refresh_token',
  token_type: 'Bearer',
  expires_in: 7200,
  created_at: 1677045997,
};

describe('Sidebar', () => {
  const user: User = { name: 'Test User', email: 'testemail@email.com', avatarUrl: mockUserProfileData.avatar_url };

  test("renders a sidebar on the page with the user's name and avatar image", () => {
    render(<Sidebar user={user} />, { wrapper: BrowserRouter });

    expect(screen.getByTestId('username')).toHaveTextContent(user.name);

    const profileImage = screen.getByTestId('sidebar-avatar') as HTMLImageElement;
    expect(profileImage.src).toContain(mockUserProfileData.avatar_url);
  });

  test('renders a sidebar on the page with a logout button that when clicked, calls Logout adapter and removes storage', async () => {
    const mockLogout = jest.spyOn(AuthAdapter, 'logout');

    // const mockClearToken = jest.spyOn(myStorage, 'clearItem');

    const storageMock = jest.spyOn(myStorage, 'getItem').mockImplementationOnce(() => {
      return { auth: mockTokenData, user: mockUserProfileData };
    });

    expect(myStorage.getItem('UserProfile')).not.toBeNull();

    render(<Sidebar user={user} />, { wrapper: BrowserRouter });

    const submitButton = screen.getByRole('button', { name: 'Logout' });

    await userEvent.click(submitButton);

    expect(mockLogout).toBeCalledTimes(1);

    expect(myStorage.getItem('UserProfile')).toBeNull();

    // navigates to LOGIN URL
    // useNavigate is not called because redirect is handled in axios interceptor? Mock window.location.href instead?

    storageMock.mockRestore();
  });
});
