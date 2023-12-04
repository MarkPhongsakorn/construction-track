import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RequestService } from '../services/companies/request.service';
import { format } from 'date-fns-tz';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-request-user',
  templateUrl: './delete-request-user.component.html',
  styleUrls: ['./delete-request-user.component.css']
})
export class DeleteRequestUserComponent implements OnInit {

  req_id: string = '';
  req_date: string = '';
  req_problem: string = '';
  req_daily: string = '';
  req_license: string = '';
  req_certificate: string = '';

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private reqService: RequestService
  ) { }

  ngOnInit(): void {
    this.reqService.getOne(this.config.data.req_id).subscribe(data => {
      const drTime = new Date(data['req_date']);
      this.req_date = format(drTime, 'dd/MM/yyyy');
      this.req_problem = data['req_problem'];
      this.req_daily = data['req_daily'];
      this.req_license = data['req_license'];
      this.req_certificate = data['req_certificate'];
    });
  }

  deleteReq() {
    const data = {
      req_problem: this.req_problem,
      req_daily: this.req_daily,
      req_license: this.req_license,
      req_certificate: this.req_certificate
    }
    this.reqService.delete(this.config.data.req_id, data).subscribe((res: any) => {
      if (res.status === 'success') {
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
    })
  }

  closeDialog() {
    this.dialogRef.close(); // เรียกเมื่อต้องการปิด dialog
  }
}
