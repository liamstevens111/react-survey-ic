type UserToken = {
  accessToken: string;
  refreshToken: string;
};

export const getToken = (): UserToken | string => {
  return JSON.parse(localStorage.getItem('UserToken') || '');
};

export const setToken = (token: UserToken) => {
  localStorage.setItem('UserToken', JSON.stringify(token));
};
