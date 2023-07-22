import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../services/reports/report.service';
import { WeatherService } from '../services/reports/weather.service';
import { LaborService } from '../services/reports/labor.service';
import { WorkService } from '../services/reports/work.service';
import { ToolService } from '../services/reports/tool.service';
import { MaterialService } from '../services/reports/material.service';
import { StrikeService } from '../services/reports/strike.service';
import { InspectionService } from '../services/reports/inspection.service';
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
    private report: ReportService,
    private weatherService: WeatherService,
    private laborService: LaborService,
    private workService: WorkService,
    private toolService: ToolService,
    private matService: MaterialService,
    private strikeService: StrikeService,
    private inspecService: InspectionService,
  ) {}

  ngOnInit() {
    this.report.getOneReport(this.data.dr_id).subscribe(data => {
      const drTime = new Date(data['dr_time']);
      this.dr_time = format(drTime, 'dd/MM/yyyy'); 
    });
  }

  delete() {
    this.reports();
    this.weather();
    this.labor();
    this.work();
    this.tool();
    this.mat();
    this.strike();
    this.inspec();
  }

  reports() {
    this.report.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
  }

  weather() {
    this.weatherService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
  }

  labor() {
    this.laborService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
  }

  work() {
    this.workService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
  }

  tool() {
    this.toolService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
  }

  mat() {
    this.matService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
  }

  strike() {
    this.strikeService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
  }

  inspec() {
    this.inspecService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
  }
}