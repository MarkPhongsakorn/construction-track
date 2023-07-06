import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  username: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(){
    
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
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/dashbord']);
        }

      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    })
  }

  onSubmit() {
    this.login();
  }

}
