class UserHelper {
  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }

  getUserId() {
    const user = JSON.parse(localStorage.getItem('token'));
    return user?.id;
  }

  setToken(token, force) {
    if (!this.getToken() || force)
      localStorage.setItem('token', JSON.stringify(token));
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
export default new UserHelper();
