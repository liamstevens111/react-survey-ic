import { useUser } from 'components/PrivateRoutes';

const HomeScreen = (): JSX.Element => {
  const user = useUser();

  return (
    <>
      <div className="my-8 text-white opacity-50" data-test-id="app-main-heading">
        Home Screen
      </div>
      {/* TODO: Remove when header implemented in #19 */}
      <div className="my-8 text-white opacity-50">{`${user?.name} - ${user?.email} - ${user?.avatarUrl}`}</div>
    </>
  );
};

export default HomeScreen;
