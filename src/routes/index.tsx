import { RouteObject } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';
import HomeScreen from 'screens/Home';
import LoginScreen from 'screens/Login';

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginScreen />,
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
