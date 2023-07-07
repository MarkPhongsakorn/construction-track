import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/users/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularForm';

  isLogin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(){
    this.isUserLogin();
  }

  isUserLogin() {
    if (this.authService.getLogin() != null) {
      this.isLogin = true;
    }
  }

  logout() {
    this.authService.clearStorage();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
