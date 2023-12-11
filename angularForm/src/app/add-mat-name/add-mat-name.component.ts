import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { MatNameService } from '../services/reports/mat-name.service';

@Component({
  selector: 'app-add-mat-name',
  templateUrl: './add-mat-name.component.html',
  styleUrls: ['./add-mat-name.component.css']
})
export class AddMatNameComponent implements OnInit {
  mat_name: string = '';
  mat_unit: string = '';

  constructor(
    private matNameService: MatNameService,
    public dialogRef: DynamicDialogRef,
  ) { }

  ngOnInit(): void {

  }

  create() {
    const data = {
      mat_name: this.mat_name,
      mat_unit: this.mat_unit,
    }
    this.matNameService.create(data).subscribe((res: any) => {
      if (res.status === 'success') {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'การเพิ่มข้อมูลสำเร็จ',
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
          text: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล',
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
