/* eslint-disable camelcase */
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { User } from 'types/User';

import Header from '.';

const mockUserProfileData = {
  email: 'testemail@gmail.com',
  name: 'TestName',
  avatar_url: 'https://secure.gravatar.com/avatar/6733d09432e89459dba795de8312ac2d',
};

describe('Header', () => {
  const user: User = { name: 'Test User', email: 'testemail@email.com', avatarUrl: mockUserProfileData.avatar_url };

  test('renders a header on the page with sidebar interaction', async () => {
    render(<Header user={user} />, { wrapper: BrowserRouter });

    const profileImage = screen.getByTestId('header-avatar') as HTMLImageElement;
    expect(profileImage).toBeInTheDocument();
    expect(profileImage.src).toContain(mockUserProfileData.avatar_url);

    expect(screen.queryByTestId('sidebar-avatar')).not.toBeInTheDocument();
    expect(screen.queryByTestId('username')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Logout' })).not.toBeInTheDocument();

    const sidebarButton = screen.getByTestId('open-sidebar');

    await userEvent.click(sidebarButton);

    expect(screen.getByTestId('sidebar-avatar')).toBeInTheDocument();
    expect(screen.getByTestId('username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();

    expect(screen.queryByTestId('header-avatar')).not.toBeInTheDocument();
  });
});
