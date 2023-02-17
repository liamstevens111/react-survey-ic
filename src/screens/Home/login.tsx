import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AuthAdapter from 'adapters/authAdapter';
import logo from 'assets/images/logo.svg';
import Button from 'components/Button';
import Input from 'components/Input';
import { setToken } from 'helpers/userToken';

enum InputFieldTypes {
  EMAIL = 'Email',
  PASSWORD = 'Password',
}

type Errors = {
  Email?: string;
  Password?: string;
};

function LoginScreen() {
  const { t } = useTranslation('translation');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const isEmailValid = (inputEmail: string) => {
    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    return emailRegEx.test(inputEmail);
  };

  const isPasswordValid = (inputPassword: string) => {
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return passwordRegEx.test(inputPassword);
  };

  const removeError = (errorField: InputFieldTypes): Errors => {
    console.log(errorField);
    const newState: Errors = {
      ...errors,
    };
    delete newState[errorField];
    return newState;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const performLogin = async () => {
    const response = await AuthAdapter.login({ email: email, password: password });

    const {
      attributes: { access_token: accessToken, refresh_token: refreshToken },
    } = await response.data;

    setToken({ accessToken: accessToken, refreshToken: refreshToken });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      setErrors({ ...errors, Email: 'Is invalid' });
    } else {
      removeError(InputFieldTypes.EMAIL);
    }

    if (!isPasswordValid(password)) {
      setErrors({ ...errors, Password: 'Is invalid' });
    } else {
      removeError(InputFieldTypes.PASSWORD);
    }

    if (Object.keys(errors).length === 0) {
      performLogin();
    }
  };

  return (
    <>
      <img className="inline-block" src={logo} alt="logo" />
      <p data-test-id="login-header" className="text-white opacity-50 my-8">
        {t('login.sign_in')} to Nimble
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          label={t('login.email')}
          type="text"
          value={email}
          className="block h-14 w-80 my-3"
          onInputChange={(e) => handleEmailChange(e)}
        />
        <div className="relative w-80">
          <Input
            name="password"
            label={t('login.password')}
            type="password"
            value={password}
            className="block h-14 w-80 my-3"
            onInputChange={(e) => handlePasswordChange(e)}
          />
          {/* Change to React Router Link when implement #17 */}
          <a href="." className="absolute text-white opacity-50 my-8 left-60 top-5">
            {t('login.forgot_password')}
          </a>
        </div>
        <Button text={t('login.sign_in')} className="h-14 w-80" />
      </form>
    </>
  );
}

export default LoginScreen;
