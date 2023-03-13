import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AxiosError } from 'axios';

import SurveyAdapter from 'adapters/surveyAdapter';
import bellNotification from 'assets/images/bell-notification.png';
import Button from 'components/Button';
import Input from 'components/Input';
import { isEmailValid } from 'helpers/validators';

function ResetPasswordScreen() {
  const { t } = useTranslation('translation');

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const performPasswordReset = async () => {
    try {
      await SurveyAdapter.resetPassword(email);
    } catch (error) {
      let errorMessage = t('login.generic-server-error');

      if (error instanceof Error) {
        errorMessage = (error as AxiosError).response?.data?.errors[0]?.detail || error.cause || errorMessage;
      }
      setErrors([errorMessage]);
    } finally {
      setFormSubmitted(false);
      setShowSuccessMessage(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = [];

    if (!isEmailValid(email)) {
      formErrors.push(t('login.invalid-email'));
    }

    setErrors(formErrors);

    if (formErrors.length === 0) {
      performPasswordReset();
      setFormSubmitted(true);
    } else {
      setShowSuccessMessage(false);
    }
  };

  return (
    <>
      <p data-test-id="reset-password-header" className="mb-8 w-80 text-center text-white opacity-50">
        {t('reset-password.header')}
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

      {showSuccessMessage && (
        <div className="my-3 w-80 rounded-xl bg-stone-800/60 p-5">
          <img className="inline-block" src={bellNotification} alt="notification-bell"></img>
          <p className="inline-block p-3 font-semibold text-white">{t('reset-password.check-email')}</p>
          <p className="right-10 inline-block p-3 text-white opacity-60">{t('reset-password.success-message')}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          label={t('login.email')}
          type="text"
          value={email}
          className="my-3 block h-14 w-80"
          onInputChange={handleEmailChange}
        />
        <Button text={t('reset-password.recovery-email')} className="h-14 w-80" type="submit" disabled={formSubmitted} />
      </form>
    </>
  );
}

export default ResetPasswordScreen;
