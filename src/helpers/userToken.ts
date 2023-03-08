type UserToken =
  | {
      access_token: string;
      refresh_token: string;
    }
  | '{}';

export const getToken = (): UserToken => {
  return JSON.parse(localStorage.getItem('UserToken') || '{}');
};

export const setToken = (token: UserToken) => {
  localStorage.setItem('UserToken', JSON.stringify(token));
};
