import { RouteObject } from 'react-router-dom';

import PrivateRoutes from 'components/PrivateRoutes';
import HomeScreen from 'screens/Home';
import LoginScreen from 'screens/Login';

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginScreen />,
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
