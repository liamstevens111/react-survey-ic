import { useNavigate } from 'react-router-dom';

import SurveyAdapter from 'adapters/surveyAdapter';
import { getItem, clearItem } from 'helpers/localStorage';
import { User } from 'types/User';

import styles from './Sidebar.module.scss';
import { LOGIN_URL } from '../../constants';

type SidebarProps = {
  user: User;
};

function Sidebar({ user }: SidebarProps) {
  const navigate = useNavigate();

  const performLogout = async (e: React.SyntheticEvent) => {
    e.stopPropagation();

    const accessToken = getItem('UserProfile')?.auth.access_token;
    await SurveyAdapter.logout(accessToken);
    clearItem('UserProfile');
    navigate(LOGIN_URL);
  };

  return (
    <aside
      data-test-id="sidebar"
      className={`${styles.sidebar} fixed top-0 right-0 flex h-screen w-1/6 min-w-fit flex-col gap-10 p-0`}
    >
      <div className="flex h-16 flex-col items-center justify-between px-5 md:flex-row md:border-b md:border-b-white">
        <span data-test-id="username" className="pt-2 font-bold text-white">
          {user.name}
        </span>
        <img
          data-test-id="sidebar-avatar"
          className="cursor-pointer rounded-full"
          height={36}
          width={36}
          src={user.avatarUrl}
          alt="profile"
        ></img>
      </div>
      <button onClick={performLogout} className="relative left-5 self-start text-xl text-white opacity-50">
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
