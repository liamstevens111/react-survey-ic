import { useRoutes } from 'react-router-dom';

import 'assets/stylesheets/application.scss';
import 'assets/fonts/Neuzeit-S-LT-Std-Book.ttf';

import routes from 'routes';

const App = (): JSX.Element => {
  const appRoutes = useRoutes(routes);

  return (
    <>
      <div className="flex flex-col text-center p-0 m-0 h-screen items-center justify-center">
        <main>{appRoutes}</main>
      </div>
    </>
  );
};

export default App;
