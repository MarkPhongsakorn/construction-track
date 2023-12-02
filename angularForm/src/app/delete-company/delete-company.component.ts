import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/companies/company.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css']
})
export class DeleteCompanyComponent implements OnInit {

  comp_name: string = '';
  comp_email: string = '';
  comp_address: string = '';

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private compService: CompanyService
  ) { }

  ngOnInit(): void {
    this.compService.getOneComp(this.config.data.comp_id).subscribe(data => {
      this.comp_name = data['comp_name'];
    });
  }

  compDelete() {
    this.compService.delete(this.config.data.comp_id).subscribe((res: any) => {
      if (res.status === "success") {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'การลบข้อมูลสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          title: 'ข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการลบข้อมูล',
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
