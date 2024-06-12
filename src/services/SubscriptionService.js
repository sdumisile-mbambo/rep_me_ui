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
}