export const getToken = () => {
  return JSON.parse(localStorage.getItem('UserToken') || '{}');
};

export const setToken = (token: { access_token: string; refresh_token: string }) => {
  localStorage.setItem('UserToken', JSON.stringify(token));
};

export const clearToken = () => {
  localStorage.removeItem('UserToken');
};
