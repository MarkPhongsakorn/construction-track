import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DialogService]
})
export class ProfileComponent implements OnInit {

  prefix: string = '';
  fname: string = '';
  lname: string = '';
  position: string = '';
  email: string = '';
  tel: string = '';

  ref: DynamicDialogRef | undefined;

  constructor(
    private userService: UserService,
    public dialogService: DialogService

  ) {}

  ngOnInit(): void {
    const user_id = sessionStorage.getItem('user_detail_id');
    if (user_id != null) {
      this.userService.getUser(user_id).subscribe(data => {
        this.prefix = data['prefix_tname']
        this.fname = data['user_fname']
        this.lname = data['user_lname']
        this.position = data['pos_name']
        this.email = data['user_email']
        this.tel = data['user_tel']
      });
    } else {
      console.log("user_id is null");
      
    }
  }

  profile() {
    const user_id = sessionStorage.getItem('user_detail_id')
     this.ref = this.dialogService.open(EditProfileComponent, {
      data: { user_detail_id: user_id }, header: ''
    });
  }

}
