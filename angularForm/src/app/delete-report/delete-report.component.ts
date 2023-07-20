import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../services/reports/report.service';
import { format } from 'date-fns-tz';

@Component({
  selector: 'app-delete-report',
  templateUrl: './delete-report.component.html',
  styleUrls: ['./delete-report.component.css']
})
export class DeleteReportComponent implements OnInit {

  dr_time: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private report: ReportService
  ) {}

  ngOnInit() {
    this.report.getOneReport(this.data.dr_id).subscribe(data => {
      const drTime = new Date(data['dr_time']);
      this.dr_time = format(drTime, 'dd/MM/yyyy'); 
    });
  }

  delete() {
    this.report.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    })
  }
}
