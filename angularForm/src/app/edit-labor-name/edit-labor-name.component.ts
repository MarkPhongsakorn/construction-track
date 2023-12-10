import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LaborNameService } from '../services/reports/labor-name.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-labor-name',
  templateUrl: './edit-labor-name.component.html',
  styleUrls: ['./edit-labor-name.component.css']
})
export class EditLaborNameComponent implements OnInit {

  labor_name: string = '';

  constructor(
    private laborNameService: LaborNameService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.laborNameService.readOne(this.config.data.labor_name_id).subscribe(data => {
      this.labor_name = data['labor_name'];
    })
  }

  update() {
    const data = {
      labor_name_id: this.config.data.labor_name_id,
      labor_name: this.labor_name
    }
    this.laborNameService.update(data).subscribe((res: any) => {
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
