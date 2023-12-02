import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/companies/company.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  comp_id: string = '';
  comp_name: string = '';
  comp_email: string = '';
  comp_address: string = '';

  constructor(
    private companyService: CompanyService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.companyService.getOneComp(this.config.data.comp_id).subscribe((res: any) => {
      this.comp_name = res['comp_name'];
      this.comp_email = res['comp_email'];
      this.comp_address = res['comp_address'];
    });
  }

  compEdit() {
    const data = {
      comp_id: this.config.data.comp_id,
      comp_name: this.comp_name,
      comp_email: this.comp_email,
      comp_address: this.comp_address
    }
    this.companyService.update(data).subscribe((res: any) => {
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
          text: 'เกิดข้อผิดพลาดในแก้ไขข้อมูล',
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
