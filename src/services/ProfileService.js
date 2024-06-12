export default class ProfileSerice {
  apiUrl = 'http://localhost:9090/repme';

  updateAgentProfile(request, token) {
    return fetch(`${this.apiUrl}/update/sales/profile`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });
  }

  updateBusinessProfile(request, token) {
    return fetch(`${this.apiUrl}/update/business/profile`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });
  }

  getAgentProfile(token) {
    return fetch(`${this.apiUrl}/sales/profile`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getBuisinessProfile(token) {
    return fetch(`${this.apiUrl}/business/profile`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
