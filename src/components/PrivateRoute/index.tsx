import { useState, useEffect } from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

import { getItem } from 'helpers/localStorage';
import type { User } from 'types/User';

type ContextType = User;

import { LOGIN_URL } from '../../constants';

function PrivateRoute() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userProfile = getItem('UserProfile');
      if (userProfile?.user) {
        setUser({ ...userProfile.user });
      }

      setLoading(false);
    };
    fetchCurrentUser();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return user ? <Outlet context={user} /> : <Navigate to={LOGIN_URL} />;
}

export default PrivateRoute;

export function useUser() {
  return useOutletContext<ContextType>();
}
