import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getLogin() {
    if (sessionStorage.getItem('username')) {
      return sessionStorage.getItem('username')
    } else {
      return null
    }
  }

  clearStorage() {
    sessionStorage.clear();
  }
}
