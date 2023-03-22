import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Header from 'components/Header';
import { getItem } from 'helpers/localStorage';
import type { User } from 'types/User';

import { LOGIN_URL } from '../../constants';

function PrivateRoute() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userProfile = getItem('UserProfile');
      if (userProfile?.user) {
        setUser({ name: userProfile.user.name, email: userProfile.user.email, avatarUrl: userProfile.user.avatar_url });
      }

      setLoading(false);
    };
    fetchCurrentUser();
  }, []);

  if (loading) {
    return <h3 data-test-id="loading">Loading...</h3>;
  }

  return user ? (
    <>
      <Header user={user} />
      <Outlet />
    </>
  ) : (
    <Navigate to={LOGIN_URL} />
  );
}

export default PrivateRoute;
