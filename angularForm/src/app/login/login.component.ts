import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';
import { AuthService } from '../services/users/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  username: string = '';
  password: string = '';

  isLogin: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    this.isUserLogin();
  }

  login(): void {
    const data = { username: this.username, password: this.password };

    this.userService.checkuser(data).subscribe((res: any) => {
      if (res.status === 'success') {
        console.log(res)

        const position = res.pos_id;

        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('password', this.password);
        sessionStorage.setItem('pos_id', position);

        if (position === 1) {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['/dashbord']).then(() => {
            window.location.reload();
          });
        }

      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    })
  }

  isUserLogin() {
    if (this.authService.getLogin() != null) {
      this.isLogin = true;
    }
  }

  logout() {
    this.authService.clearStorage();
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.login();
  }

}
