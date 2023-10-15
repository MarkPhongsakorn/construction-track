import { Component, OnInit } from '@angular/core';
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
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { forkJoin, Observable } from 'rxjs';
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
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
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
    this.report.getOneReport(this.config.data.dr_id).subscribe(data => {
      const drTime = new Date(data['dr_time']);
      this.dr_time = format(drTime, 'dd/MM/yyyy'); 
    });
  }

  deleteAll() {
    const deleteRequests: Observable<any>[] = [
      this.report.delete(this.config.data.dr_id),
      this.weatherService.delete(this.config.data.dr_id),
      this.laborService.delete(this.config.data.dr_id),
      this.workService.delete(this.config.data.dr_id),
      this.toolService.delete(this.config.data.dr_id),
      this.matService.delete(this.config.data.dr_id),
      this.problemService.delete(this.config.data.dr_id),
      this.strikeService.delete(this.config.data.dr_id),
      this.inspecService.delete(this.config.data.dr_id)
    ];

    forkJoin(deleteRequests).subscribe(
      (responses: any[]) => {
        // Handle responses
        for (const res of responses) {
          if (res.status === 'success') {
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
            break;  // Stop checking if any of the requests failed
          }
        }
      });
  }

  closeDialog() {
    this.dialogRef.close(); // เรียกเมื่อต้องการปิด dialog
  }
}
