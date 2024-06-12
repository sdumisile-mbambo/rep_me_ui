export default class AdminService {
  apiUrl = 'https://coa-api.co.za/coa';

  getChefList(token) {
    return fetch(`${this.apiUrl}/get/chef/profiles`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  addChef(token, name, surname, email, contactNumber, chefSummary,cuisines, isBrandChef) {
    return fetch(`${this.apiUrl}/register/chef`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        surname,
        email,
        contactNumber,
        chefSummary,
        cuisines,
        isBranded: isBrandChef
      }),
    });
  }

  addCusine(token, request) {
    return fetch(`${this.apiUrl}/create/cuisine `, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });
  }

  getCuisineList(token) {
    return fetch(`${this.apiUrl}/get/cuisines`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getMenuList(token) {
    return fetch(`${this.apiUrl}/get/menus`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateChefProfilPicture(token, request) {
    return fetch(`${this.apiUrl}/upload/chef/profile/picture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: request,
    });
  }

  updateMenuGallery(token, request) {
    return fetch(`${this.apiUrl}/upload/menu/gallery`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: request,
    });
  }


  updateCuisineCoverImage(token, request) {
    return fetch(`${this.apiUrl}/upload/cuisine/cover/picture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: request,
    });
  }

  addMenu(token, request) {
    return fetch(`${this.apiUrl}/create/menu`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });
  }

  getPackageList(token) {
    return fetch(`${this.apiUrl}/get/packages`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getAllBookings(token) {
    return fetch(`${this.apiUrl}/get/all/bookings`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
