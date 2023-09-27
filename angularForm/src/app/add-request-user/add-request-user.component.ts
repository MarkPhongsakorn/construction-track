import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService } from '../services/companies/request.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-request-user',
  templateUrl: './add-request-user.component.html',
  styleUrls: ['./add-request-user.component.css']
})
export class AddRequestUserComponent implements OnInit {
  
  reqProblem: File | null = null;
  reqDaily: File | null = null;
  reqLicense: File | null = null;
  reqCertificate: File | null = null;

  req_date: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<AddRequestUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private request: RequestService
  ){}

  ngOnInit(): void {
    
  }

  selectedProblem(event: any) {
    this.reqProblem = event.target.files[0] as File;
  }
  selectedDaily(event: any) {
    this.reqDaily = event.target.files[0] as File;
  }
  selectedLicense(event: any) {
    this.reqLicense = event.target.files[0] as File;
  }
  selectedCertificate(event: any) {
    this.reqCertificate = event.target.files[0] as File;
  }
  
  onUpload() {
    const formData = new FormData();

    if (this.reqProblem) {
      formData.append('req_problem', this.reqProblem);
    }
    if (this.reqDaily) {
      formData.append('req_daily', this.reqDaily);
    }
    if (this.reqLicense) {
      formData.append('req_license', this.reqLicense);
    }
    if (this.reqCertificate) {
      formData.append('req_certificate', this.reqCertificate);
    }
    // formData.append('req_date', this.req_date);
    formData.append('project_id', this.data.project_id);
    formData.append('comp_id', this.data.comp_id);
    // const data = {
    //   // req_date: this.req_date,
    //   project_id: this.data.project_id,
    //   comp_id: this.data.comp_id
    // }
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
}
