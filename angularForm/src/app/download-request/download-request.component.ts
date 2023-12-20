import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RequestService } from '../services/companies/request.service';
import { PdfService } from '../services/reports/pdf.service';
import { format } from 'date-fns-tz';

@Component({
  selector: 'app-download-request',
  templateUrl: './download-request.component.html',
  styleUrls: ['./download-request.component.css']
})
export class DownloadRequestComponent implements OnInit {

  req_date: string = '';
  req_problem: string = '';
  file_problem: string = '';
  req_daily: string = '';
  req_license: string = '';
  req_certificate: string = '';

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private reqService: RequestService,
    private pdfSerive: PdfService
  ) { }

  ngOnInit(): void {
    this.reqService.getOne(this.config.data.req_id).subscribe(data => {
      const reqDate = new Date(data['req_date'])
      this.req_date = format(reqDate, 'dd/MM/yyyy');
      this.req_problem = data['req_problem'];
      this.file_problem = data['file_problem'];
      this.req_daily = data['req_daily'];
      this.req_license = data['req_license'];
      this.req_certificate = data['req_certificate'];

    })
  }

  downloadReq() {
    // กำหนดชื่อไฟล์ที่คุณต้องการ
    const fileNames = [this.req_problem, this.req_daily, this.req_license, this.req_certificate];

    // ตรวจสอบว่ามีไฟล์ที่ต้องการดาวน์โหลดหรือไม่
    const filesToDownload = fileNames.filter((fileName) => !!fileName);

    if (filesToDownload.length > 0) {
      // ถ้ามีไฟล์ที่ต้องการดาวน์โหลด
      this.pdfSerive.downloadFiles(this.config.data.req_id).subscribe(
        (blob: Blob) => {
          this.pdfSerive.saveFile(blob, filesToDownload);
        },
        (error) => {
          console.error('Error downloading files', error);
        }
      );
    } else {
      console.log('ไม่มีไฟล์ที่ต้องการดาวน์โหลด');
    }
  }

  closeDialog() {
    this.dialogRef.close(); // เรียกเมื่อต้องการปิด dialog
  }

}
