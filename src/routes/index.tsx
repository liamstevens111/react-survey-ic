import { RouteObject } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';
import HomeScreen from 'screens/Home';
import LoginScreen from 'screens/Login';
import ResetPasswordScreen from 'screens/ResetPassword';

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordScreen />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
    ],
  },
];

export default routes;
