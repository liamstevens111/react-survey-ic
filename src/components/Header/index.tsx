import { useState } from 'react';

import logo from 'assets/images/logo.svg';
import Sidebar from 'components/Sidebar';
import { User } from 'types/User';

type HeaderProps = {
  user: User;
};

function Header({ user }: HeaderProps) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <header className="fixed top-5 flex w-11/12 flex-row items-center justify-between p-0">
      <div>
        <img src={logo} alt="logo"></img>
      </div>
      <div onClick={() => setSidebarVisible(!sidebarVisible)} role="presentation">
        {sidebarVisible ? (
          <Sidebar user={user} />
        ) : (
          <div>
            <img className="cursor-pointer rounded-full" height={36} width={36} src={user.avatarUrl} alt="profile"></img>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
