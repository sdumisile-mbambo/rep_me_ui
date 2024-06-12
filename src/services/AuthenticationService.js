export default class AuthSerice {
  apiUrl = 'http://localhost:9090/repme';

  registerUser(request) {
    return fetch(`${this.apiUrl}/register/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
  }

  registerBusiness(request) {
    return fetch(`${this.apiUrl}/register/business`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
  }

  signIn(request) {
    return fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
  }

  createChefLogin(email, password){
    return fetch(`${this.apiUrl}/set/password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    });
  }
}
