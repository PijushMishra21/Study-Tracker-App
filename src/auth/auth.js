
const TOKEN_KEY = "token";

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

//  Get token from localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

//  Check if user is logged in
export const isLoggedIn = () => {
  return !!getToken();
};

//  Logout: remove token
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
