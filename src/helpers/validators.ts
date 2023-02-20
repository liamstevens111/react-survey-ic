import { PASSWORD_MIN_LENGTH } from '../constants';

export const isEmailValid = (email: string) => {
  const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  return emailRegEx.test(email);
};

export const isPasswordValid = (password: string) => {
  // TODO: Should match backend logic or remove completely
  return password.length >= PASSWORD_MIN_LENGTH;
};
