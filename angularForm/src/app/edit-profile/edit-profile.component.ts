import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PrefixService } from '../services/users/prefix.service';
import { PositionService } from '../services/users/position.service';
import { UserService } from '../services/users/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  prefixes: any[] = [];
  positions: any[] = [];
  selectedPrefix: string = '';
  selectedPosition: string = '';

  prefix: string = '';
  fname: string = '';
  lname: string = '';
  position: string = '';
  email: string = '';
  tel: string = '';

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private prefixService: PrefixService,
    private positionService: PositionService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.prefixService.getPrefix().subscribe(data => {
      this.prefixes = data;
    });

    this.positionService.getPos().subscribe(data => {
      this.positions = data;
    })

    this.userService.getUser(this.config.data.user_detail_id).subscribe(data => {
      this.selectedPrefix = data['prefix_id']
      this.fname = data['user_fname']
      this.lname = data['user_lname']
      this.selectedPosition = data['pos_id']
      this.email = data['user_email']
      this.tel = data['user_tel']
    });
  }

  updateUser() {
    const data = {
      user_detail_id: this.config.data.user_detail_id,
      prefix_id: this.selectedPrefix,
      user_fname: this.fname,
      user_lname: this.lname,
      pos_id: this.selectedPosition,
      user_email: this.email,
      user_tel: this.tel
    }
    this.userService.updateUser(data).subscribe((res: any) => {
      if (res.status === 'success') {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'การสร้างโครงการสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        console.log(res.message); // Failed to create user
        Swal.fire({
          title: 'ข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการสร้างโครงการ',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    });
  }

  closeDialog() {
    this.dialogRef.close(); // เรียกเมื่อต้องการปิด dialog
  }
}
