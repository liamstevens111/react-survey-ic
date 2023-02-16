import { useTranslation } from 'react-i18next';

import AuthAdapter from 'adapters/authAdapter';
import logo from 'assets/images/logo.svg';
import Button from 'components/Button';
import Input from 'components/Input';
import { setToken } from 'helpers/userToken';

// TODO: Remove when login functionality implemented in #8
const tempHandler = () => {
  return undefined;
};

// TODO: Remove after testing
const performLogin = async () => {
  const response = await AuthAdapter.login({ email: 'placeholder', password: 'placeholder' });

  const {
    attributes: { access_token: accessToken, refresh_token: refreshToken },
  } = await response.data;

  setToken({ accessToken: accessToken, refreshToken: refreshToken });
};

function LoginScreen() {
  const { t } = useTranslation('translation');

  performLogin();

  return (
    <>
      <img className="inline-block" src={logo} alt="logo" />
      <p data-test-id="login-header" className="text-white opacity-50 my-8">
        {t('login.sign_in')} to Nimble
      </p>
      <form>
        <Input name="email" label={t('login.email')} type="text" className="block h-14 w-80 my-3" onInputChange={tempHandler} />
        <div className="relative w-80">
          <Input
            name="password"
            label={t('login.password')}
            type="password"
            className="block h-14 w-80 my-3"
            onInputChange={tempHandler}
          />
          {/* Change to React Router Link when implement #17 */}
          <a href="." className="absolute text-white opacity-50 my-8 left-60 top-5">
            {t('login.forgot_password')}
          </a>
        </div>
        <Button type="button" text={t('login.sign_in')} className="h-14 w-80" onButtonClick={tempHandler} />
      </form>
    </>
  );
}

export default LoginScreen;
