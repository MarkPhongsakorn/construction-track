import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService,
  ) { }

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
