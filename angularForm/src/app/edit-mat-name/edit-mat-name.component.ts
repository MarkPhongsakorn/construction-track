import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { MatNameService } from '../services/reports/mat-name.service';

@Component({
  selector: 'app-edit-mat-name',
  templateUrl: './edit-mat-name.component.html',
  styleUrls: ['./edit-mat-name.component.css']
})
export class EditMatNameComponent implements OnInit {

  mat_name: string = '';
  mat_unit: string = '';

  constructor(
    private matNameService: MatNameService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.matNameService.readOne(this.config.data.mat_name_id).subscribe(data => {
      this.mat_name = data['mat_name'];
      this.mat_unit = data['mat_unit'];
    })
  }

  update() {
    const data = {
      mat_name_id: this.config.data.mat_name_id,
      mat_name: this.mat_name,
      mat_unit: this.mat_unit
    }
    this.matNameService.update(data).subscribe((res: any) => {
      if (res.status === 'success') {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'การแก้ไขข้อมูลสำเร็จ',
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
          text: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    })
  }

  closeDialog() {
    this.dialogRef.close(); // เรียกเมื่อต้องการปิด dialog
  }
}
