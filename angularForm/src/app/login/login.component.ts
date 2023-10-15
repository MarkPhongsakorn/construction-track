import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';
import { AuthService } from '../services/users/auth.service';
import Swal from 'sweetalert2';

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

  ngOnInit() {
  }

  login(): void {
    const data = { username: this.username, password: this.password };

    this.userService.checkuser(data).subscribe((res: any) => {
      if (res.status === 'success') {
        console.log(res)

        const position = res.pos_id;
        const user_id = res.user_detail_id;

        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('password', this.password);
        sessionStorage.setItem('user_detail_id', user_id);
        sessionStorage.setItem('pos_id', position);

        if (position === 1) {
          Swal.fire({
            title: 'สำเร็จ',
            text: 'เข้าสู่ระบบวิศวกรควบคุมของบริษัทสำเร็จ',
            icon: 'success',
            confirmButtonText: 'ตกลง'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/request-user']).then(() => {
                window.location.reload();
              });
            }
          });
        } else {
          Swal.fire({
            title: 'สำเร็จ',
            text: 'เข้าสู่ระบบวิศวกรควบคุมของมหาลัยสำเร็จ',
            icon: 'success',
            confirmButtonText: 'ตกลง'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/dashboard']).then(() => {
                window.location.reload();
              });
            }
          });
        }

      } else {
        console.log(res.message); // Failed to create user
        Swal.fire({
          title: 'ข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    })
  }
 

  // logout() {
  //   this.authService.clearStorage();
  //   this.router.navigate(['/']);
  // }

  onSubmit() {
    this.login();
  }

}
