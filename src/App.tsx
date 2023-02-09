import React from 'react';
import { useRoutes } from 'react-router-dom';

import 'assets/stylesheets/application.scss';

import 'assets/fonts/Neuzeit-S-LT-Std-Book.ttf';

import routes from 'routes';

const App = (): JSX.Element => {
  const appRoutes = useRoutes(routes);

  return <>{appRoutes}</>;
};

export default App;
