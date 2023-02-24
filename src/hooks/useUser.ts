export default useUser;

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useUser = () => {
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    // functionality to call the API again and set toked and current user?
    return;
  }, [location);
};
