import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RequestService } from '../services/companies/request.service';
import Swal from 'sweetalert2';
import { format } from 'date-fns-tz';

@Component({
  selector: 'app-edit-request-user',
  templateUrl: './edit-request-user.component.html',
  styleUrls: ['./edit-request-user.component.css']
})
export class EditRequestUserComponent implements OnInit {

  req_problemUrl: string = '';

  req_problem: File | undefined;
  req_daily: File | undefined;
  req_license: File | undefined;
  req_certificate: File | undefined;

  req_date: Date = new Date();

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private request: RequestService,
) {}

  ngOnInit(): void {
    this.request.getOne(this.config.data.req_id).subscribe(data => {
      this.req_date = new Date (data['req_date'])
    })
    
  }

  selectedProblem(event: any) {
    this.req_problem = event.files[0];
  }
  selectedDaily(event: any) {
    this.req_daily = event.files[0];
  }
  selectedLicense(event: any) {
    this.req_license = event.files[0];
  }
  selectedCertificate(event: any) {
    this.req_certificate = event.files[0];
  }

  onUpload() {
    const date = new Date(this.req_date);
    date.setHours(0, 0, 0, 0);
    const dateThai = format(date, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Bangkok' });
    const formData = new FormData();

    if (this.req_problem) {
      formData.append('req_problem', this.req_problem);
    }
    if (this.req_daily) {
      formData.append('req_daily', this.req_daily);
    }
    if (this.req_license) {
      formData.append('req_license', this.req_license);
    }
    if (this.req_certificate) {
      formData.append('req_certificate', this.req_certificate);
    }
    formData.append('req_date', dateThai);
    formData.append('project_id', this.config.data.project_id);
    formData.append('comp_id', this.config.data.comp_id);

    this.request.uploadFile(formData).subscribe((event: any) => {
      if (event.status === "success") {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'อัพโหลดไฟล์สำเร็จ',
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
          text: 'ไม่สามารถอัพโหลดไฟล์ได้',
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
