import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/users/auth.service';
import { Router } from '@angular/router';
import { PositionService } from './services/users/position.service';
import { UserService } from './services/users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularForm';

  isLogin: boolean = false;
  isPos1: boolean = false;
  isPos2: boolean = false;

  post: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private posService: PositionService,
    private userService: UserService,
  ) {}

  ngOnInit(){
    this.isUserLogin();
  }

  isUserLogin() {
    if (this.authService.getLogin() != null) {
      this.isLogin = true;
      if (this.authService.getPos() === '1') {
        this.isPos1 = true
      } else {
        this.isPos2 = true
      }
    }
  }

  logout() {
    this.authService.clearStorage();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
