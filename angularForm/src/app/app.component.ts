import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/users/auth.service';
import { Router } from '@angular/router';
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

  fname: string = '';
  prefix: string = '';

  items1: MenuItem[] = [];
  items2: MenuItem[] = [];
  items3: MenuItem[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(){
    this.isUserLogin();
    this.item();
  }

  item() {

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
        label: 'โปรไฟล์',
        routerLink: '/profile',
        icon: 'pi pi-users'
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
        label: 'โปรไฟล์',
        routerLink: '/profile',
        icon: 'pi pi-users'
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
