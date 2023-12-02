import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/companies/company.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  comp_name: string = '';
  comp_email: string = '';
  comp_address: string = '';

  constructor(
    private companyService: CompanyService,
    public dialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {

  }

  compCreate() {
    const data = {
      comp_name: this.comp_name,
      comp_email: this.comp_email,
      comp_address: this.comp_address
    }
    this.companyService.create(data).subscribe((res: any) => {
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
          text: 'เกิดข้อผิดพลาดในเพิ่มข้อมูล',
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
