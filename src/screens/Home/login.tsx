import logo from 'assets/images/logo.svg';
import Button from 'components/Button';
import Input from 'components/Input';

const myFunc = () => {
  console.log('hello');
  alert('i');
};

const myChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
  console.log(e);
};

const myChange2 = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
  console.log(e);
};

function LoginScreen() {
  return (
    <>
      <img className="inline-block" src={logo} alt="logo" />
      <p className="text-white opacity-50 my-8">Sign in to Nimble</p>
      <form>
        <Input name="email" label="Email" type="text" className="block h-14 w-80 pl-3 my-3" onInputChange={myChange} />
        <Input name="password" label="Password" type="password" className="block h-14 w-80 pl-3 my-3" onInputChange={myChange2} />
        <Button type="button" text="Sign in" className="h-14 w-80" onButtonClick={myFunc} />
      </form>
    </>
  );
}

export default LoginScreen;
