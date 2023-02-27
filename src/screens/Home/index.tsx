import { useUser } from 'components/PrivateRoutes';

const HomeScreen = (): JSX.Element => {
  const user = useUser();

  return (
    <>
      <div className="my-8 text-white opacity-50" data-test-id="app-main-heading">
        Home Screen
      </div>
      <div className="my-8 text-white opacity-50">{user && user.email}</div>
    </>
  );
};

export default HomeScreen;
