import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';
import { PrefixService } from '../services/users/prefix.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  prefix: any[] = [];
  selectedPrefix!: string;

  username: string = '';
  email: string = '';
  password: string = '';
  
  submitted = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private prefixService: PrefixService,
    private router: Router
  ) { }

  ngOnInit() {
    this.prefixService.getPrefix().subscribe(data =>{
      this.prefix = data;
    });
  }

  updateData() {
    console.log('Selected Position:', this.selectedPrefix);
  }

  save() {
    const data = { username: this.username, email: this.email, password: this.password };
    this.userService.createUser(data).subscribe((res: any) => {
      if (res.status === 'success') {
        console.log(res);
        // this.successMessage = 'User created successfully.';
        
        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('email', this.email);
        sessionStorage.setItem('password', this.password);
        this.router.navigate(['/login']);
      }else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
