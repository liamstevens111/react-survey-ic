import { Navigate, Outlet } from 'react-router-dom';

import useUser from 'hooks/useUser';

function PrivateRoutes() {
  const { currentUser } = useUser();

  return currentUser ? <Outlet context={{ currentUser }} /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
