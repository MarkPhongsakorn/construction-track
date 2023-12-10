import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LaborNameService } from '../services/reports/labor-name.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-labor-name',
  templateUrl: './add-labor-name.component.html',
  styleUrls: ['./add-labor-name.component.css']
})
export class AddLaborNameComponent implements OnInit {

  labor_name: string = '';

  constructor(
    private laborNameService: LaborNameService,
    public dialogRef: DynamicDialogRef,
  ) { }

  ngOnInit(): void {

  }

  create() {
    const data = {
      labor_name: this.labor_name
    }
    this.laborNameService.create(data).subscribe((res: any) => {
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
