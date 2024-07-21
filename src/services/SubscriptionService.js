export default class SubscriptionService {
    apiUrl = 'http://localhost:9090/repme';

getSubscriptionDetails(token) {
    return fetch(`${this.apiUrl}/get/subscription`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }


  updateSubscriptionDetails(token, request) {
    console.log("request", request);
    return fetch(`${this.apiUrl}/update/subscription`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });
  }
}