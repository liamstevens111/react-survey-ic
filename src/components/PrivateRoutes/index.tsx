import { useState, useEffect } from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

import AuthAdapter from 'adapters/authAdapter';
import { getToken } from 'helpers/userToken';
import type { User } from 'types/User';

type ContextType = User;

import { LOGIN_URL } from '../../constants';

function PrivateRoutes() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = getToken().access_token;

      if (!token) {
        setLoading(false);
      } else {
        const response = await AuthAdapter.getUser();

        const data = await response.data;

        setUser(data.attributes);
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  if (loading) {
    return null;
  }

  return user ? <Outlet context={user} /> : <Navigate to={LOGIN_URL} />;
}

export default PrivateRoutes;

export function useUser() {
  return useOutletContext<ContextType>();
}
