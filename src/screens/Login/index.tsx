import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

import { AxiosError } from 'axios';

import AuthAdapter from 'adapters/authAdapter';
import logo from 'assets/images/logo.svg';
import Button from 'components/Button';
import Input from 'components/Input';
import { setItem } from 'helpers/localStorage';
import { isEmailValid, isPasswordValid } from 'helpers/validators';

import { PASSWORD_MIN_LENGTH } from '../../constants';

function LoginScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation('translation');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const performLogin = async () => {
    try {
      const loginResponse = await AuthAdapter.loginWithEmailPassword({ email: email, password: password });

      const { attributes: authInfo } = await loginResponse.data;

      setItem('UserProfile', { auth: authInfo });

      const getUserResponse = await AuthAdapter.getUser();

      const { attributes: userInfo } = await getUserResponse.data;

      setItem('UserProfile', { auth: authInfo, user: userInfo });

      navigate('/');
    } catch (error) {
      let errorMessage = t('login.generic-server-error');

      if (error instanceof Error) {
        errorMessage = (error as AxiosError).response?.data?.errors[0]?.detail || error.cause || errorMessage;
      }
      setErrors([errorMessage]);
    } finally {
      setFormSubmitted(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = [];

    if (!isEmailValid(email)) {
      formErrors.push(t('login.invalid-email'));
    }

    if (!isPasswordValid(password)) {
      formErrors.push(t('login.invalid-password', { passwordMinLength: PASSWORD_MIN_LENGTH }));
    }

    setErrors(formErrors);

    if (formErrors.length === 0) {
      setFormSubmitted(true);
      performLogin();
    }
  };

  return (
    <>
      <img className="inline-block" src={logo} alt="logo" />
      <p data-test-id="login-header" className="my-8 text-white opacity-50">
        {t('login.sign-in')} to Nimble
      </p>

      <div className="errors">
        {errors.length > 0 &&
          errors.map((error) => {
            return (
              <p className="text-center text-red-700" key={error.toString()}>
                {error}
              </p>
            );
          })}
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          label={t('login.email')}
          type="text"
          value={email}
          className="my-3 block h-14 w-80"
          onInputChange={handleEmailChange}
        />
        <div className="relative">
          <Input
            name="password"
            label={t('login.password')}
            type="password"
            value={password}
            className="my-3 block h-14 w-80"
            onInputChange={handlePasswordChange}
          />

          {/* TODO: Change to React Router Link when implement #17 */}
          <Link to="/reset-password" className="absolute left-60 top-5 my-8 text-white opacity-50">
            {t('login.forgot-password')}
          </Link>
        </div>
        <Button text={t('login.sign-in')} className="h-14 w-80" type="submit" disabled={formSubmitted} />
      </form>
    </>
  );
}

export default LoginScreen;
