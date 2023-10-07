import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';
import { PrefixService } from '../services/users/prefix.service';
import { PositionService } from '../services/users/position.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  prefixes: any[] = [];
  positions: any[] = [];
  selectedPrefix!: string;
  selectedPosition!: string;

  username: string = '';
  password: string = '';
  user_fname: string = '';
  user_lname: string = '';
  user_email: string = '';
  user_tel: string = '';


  submitted = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private prefixService: PrefixService,
    private positionService: PositionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.prefixService.getPrefix().subscribe(data => {
      this.prefixes = data;
    });
    this.positionService.getPos().subscribe(data => {
      this.positions = data;
    })
  }

  save() {
    const data = {
      username: this.username,
      password: this.password,
      prefix_id: this.selectedPrefix,
      user_fname: this.user_fname,
      user_lname: this.user_lname,
      pos_id: this.selectedPosition,
      user_email: this.user_email,
      user_tel: this.user_tel
    };
  
    this.userService.createUser(data).subscribe((res: any) => {
      if (res.status === 'success') {
        console.log(res);
        // this.successMessage = 'User created successfully.';
        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('password', this.password);
        sessionStorage.setItem('user_fname', this.user_fname);
        sessionStorage.setItem('user_lname', this.user_lname);
        sessionStorage.setItem('user_email', this.user_email);
        sessionStorage.setItem('user_tel', this.user_tel);
        sessionStorage.setItem('pos_id', this.selectedPosition);
        sessionStorage.setItem('prefix_id', this.selectedPrefix);
        Swal.fire({
          title: 'สำเร็จ',
          text: 'สมัครสมาชิกสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']).then(() => {
              window.location.reload();
            });
          }
        });
      } else {
        Swal.fire({
          title: 'ข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการในการสมัครสมาชิก',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    });
  }
  

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
