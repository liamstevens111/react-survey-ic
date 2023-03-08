import { User } from 'types/User';

type HeaderProps = {
  user: User;
};

function Header({ user }: HeaderProps) {
  return (
    <header className="flex w-screen flex-row items-center justify-between p-0">
      <div className="">Test logo for {user.email}</div>
      <div className="profile-image">Test image for {user.name}</div>
    </header>
  );
}

export default Header;
