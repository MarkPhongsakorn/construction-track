import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/users/auth.service';
import { Router } from '@angular/router';
import { PositionService } from './services/users/position.service';
import { UserService } from './services/users/user.service';
import { MenuItem } from 'primeng/api';

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

  items1: MenuItem[] | undefined;
  items2: MenuItem[] | undefined;
  items3: MenuItem[] | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private posService: PositionService,
    private userService: UserService,
  ) {}

  ngOnInit(){
    this.isUserLogin();
    this.items1 = [
      {
        label: 'โครงการ',
        routerLink: '/dashboard'
      },
      {
        label: 'การร้องขอ',
        routerLink: '/request-admin'
      },
      {
        label: 'ออกจากระบบ',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ]
    this.items2 = [
      {
        label: 'เข้าสู่ระบบ',
        icon: 'pi pi-sign-in',
        routerLink: '/login'
      },
      {
        label: 'สมัครสมาชิก',
        icon: 'pi pi-user',
        routerLink: '/register'
      }
    ]
    this.items3 = [
      {
        label: 'การร้องขอ',
        routerLink: '/request-user'
      },
      {
        label: 'ออกจากระบบ',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ]
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
