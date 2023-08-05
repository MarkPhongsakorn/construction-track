import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../services/reports/report.service';
import { WeatherService } from '../services/reports/weather.service';
import { LaborService } from '../services/reports/labor.service';
import { WorkService } from '../services/reports/work.service';
import { ToolService } from '../services/reports/tool.service';
import { MaterialService } from '../services/reports/material.service';
import { ProblemService } from '../services/reports/problem.service';
import { StrikeService } from '../services/reports/strike.service';
import { InspectionService } from '../services/reports/inspection.service';
import { format } from 'date-fns-tz';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-report',
  templateUrl: './delete-report.component.html',
  styleUrls: ['./delete-report.component.css']
})
export class DeleteReportComponent implements OnInit {

  dr_time: string = '';
  status: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private report: ReportService,
    private weatherService: WeatherService,
    private laborService: LaborService,
    private workService: WorkService,
    private toolService: ToolService,
    private matService: MaterialService,
    private problemService: ProblemService,
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
    this.prob();
    this.strike();
    this.inspec();
    if (this.status = true) {
      Swal.fire({
        title: 'สำเร็จ',
        text: 'การลบรายงานสำเร็จ',
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
        text: 'เกิดข้อผิดพลาดในการลบรายงาน',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    }
  }

  reports() {
    this.report.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        return this.status = true
      } else {
        return this.status
      }
    });
  }

  weather() {
    this.weatherService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        return this.status = true
      } else {
        return this.status
      }
    });
  }

  labor() {
    this.laborService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        return this.status = true
      } else {
        return this.status
      }
    });
  }

  work() {
    this.workService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        return this.status = true
      } else {
        return this.status
      }
    });
  }

  tool() {
    this.toolService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        return this.status = true
      } else {
        return this.status
      }
    });
  }

  mat() {
    this.matService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        return this.status = true
      } else {
        return this.status
      }
    });
  }

  prob() {
    this.problemService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        return this.status = true
      } else {
        return this.status
      }
    });
  }

  strike() {
    this.strikeService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        return this.status = true
      } else {
        return this.status
      }
    });
  }

  inspec() {
    this.inspecService.delete(this.data.dr_id).subscribe(res => {
      if (res.status === 'success') {
        return this.status = true
      } else {
        return this.status
      }
    });
  }
}
