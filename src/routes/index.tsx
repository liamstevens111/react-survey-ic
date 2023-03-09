import { RouteObject } from 'react-router-dom';

import PrivateRoutes from 'components/PrivateRoutes';
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
    element: <PrivateRoutes />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
    ],
  },
];

export default routes;
