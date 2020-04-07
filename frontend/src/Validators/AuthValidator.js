module.exports = {
  isAuthenticated() {
    const authenticated = !!localStorage.getItem('accessToken');

    if (!authenticated) {
      localStorage.clear();
    }
    
    return authenticated;
  }
};
