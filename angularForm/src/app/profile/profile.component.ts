import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { PrefixService } from '../services/users/prefix.service';
import { PositionService } from '../services/users/position.service';

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

  prefixes: any[] = [];
  selectedPrefix: string = '';

  positions: any[] = [];
  selectedPosition: string = '';

  ref: DynamicDialogRef | undefined;

  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    private prefixService: PrefixService,
    private positionService: PositionService,

  ) {}

  ngOnInit(): void {
    this.prefixService.getPrefix().subscribe(data => {
      this.prefixes = data;
    });

    this.positionService.getPos().subscribe(data => {
      this.positions = data;
    })

    const user_id = sessionStorage.getItem('user_detail_id');
    if (user_id != null) {
      this.userService.getUser(user_id).subscribe(data => {
        this.selectedPrefix = data['prefix_id']
        this.fname = data['user_fname']
        this.lname = data['user_lname']
        this.selectedPosition = data['pos_id']
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
