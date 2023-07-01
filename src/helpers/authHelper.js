export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  if (localStorage.getItem('user')) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.token) {
      return true;
    }
  }
  return false;
};
