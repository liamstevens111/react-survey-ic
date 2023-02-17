export const isEmailValid = (email: string) => {
  const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  return emailRegEx.test(email);
};

export const isPasswordValid = (password: string) => {
  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  return passwordRegEx.test(password);
};
