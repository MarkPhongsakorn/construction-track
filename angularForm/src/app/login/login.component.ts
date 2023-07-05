import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';
import { PrefixService } from '../services/users/prefix.service';
import { PositionService } from '../services/users/position.service';
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
    private prefixService: PrefixService,
    private positionService: PositionService,
    private router: Router
  ) { }

  ngOnInit(){
    
  }

  login():void {
    const data = { username: this.username, password: this.password };

    this.userService.checkuser(data).subscribe((res: any) => {
      
    })
  }

  onSubmit() {
    this.login();
  }

}
