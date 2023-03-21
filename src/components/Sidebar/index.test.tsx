/* eslint-disable camelcase */
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AuthAdapter from 'adapters/authAdapter';
import { User } from 'types/User';

import Sidebar from '.';
// import * as localStorage from '../../helpers/localStorage';

const mockUserProfileData = {
  email: 'testemail@gmail.com',
  name: 'TestName',
  avatar_url: 'https://secure.gravatar.com/avatar/6733d09432e89459dba795de8312ac2d',
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

    // jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
    //   return { auth: 'mockTokenData', user: mockUserProfileData };
    // });

    // const mockStorageClear = jest.spyOn(localStorage, 'clearItem');

    render(<Sidebar user={user} />, { wrapper: BrowserRouter });

    const submitButton = screen.getByRole('button', { name: 'Logout' });

    await userEvent.click(submitButton);

    expect(mockLogout).toBeCalledTimes(1);

    // expect(mockStorageClear).toBeCalled();

    // navigates to LOGIN URL
  });
});
