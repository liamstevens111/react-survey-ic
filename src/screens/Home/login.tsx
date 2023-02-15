import logo from 'assets/images/logo.svg';
import Button from 'components/Button';
import Input from 'components/Input';

// TODO: Remove when login functionality implemented in #8
const tempHandler = () => {
  return undefined;
};

function LoginScreen() {
  return (
    <>
      <img className="inline-block" src={logo} alt="logo" />
      <p className="text-white opacity-50 my-8">Sign in to Nimble</p>
      <form>
        <Input name="email" label="Email" type="text" className="block h-14 w-80 my-3" onInputChange={tempHandler} />
        <div className="relative w-80">
          <Input name="password" label="Password" type="password" className="block h-14 w-80 my-3" onInputChange={tempHandler} />
          {/* Change to React Router Link when implement #17 */}
          <a href="." className="absolute text-white opacity-50 my-8 left-60 top-5">
            Forgot?
          </a>
        </div>
        <Button type="button" text="Sign in" className="h-14 w-80" onButtonClick={tempHandler} />
      </form>
    </>
  );
}

export default LoginScreen;
