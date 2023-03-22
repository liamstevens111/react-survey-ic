import { useRoutes } from 'react-router-dom';

import 'assets/stylesheets/application.scss';
import 'assets/fonts/Neuzeit-S-LT-Std-Book.ttf';

import routes from 'routes';

const App = (): JSX.Element => {
  const appRoutes = useRoutes(routes);

  return (
    <div>
      <main className="m-0 flex h-screen w-full flex-col items-center justify-center p-0">{appRoutes}</main>
    </div>
  );
};

export default App;
