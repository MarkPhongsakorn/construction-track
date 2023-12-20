import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/projects/project.service';
import { ReportService } from '../services/reports/report.service';
import { WeatherService } from '../services/reports/weather.service';
import { LaborService } from '../services/reports/labor.service';
import { WorkService } from '../services/reports/work.service';
import { ToolService } from '../services/reports/tool.service';
import { MaterialService } from '../services/reports/material.service';
import { ProblemService } from '../services/reports/problem.service';
import { StrikeService } from '../services/reports/strike.service';
import { InspectionService } from '../services/reports/inspection.service';
import { OverdueService } from '../services/reports/overdue.service';
import { RequestService } from '../services/companies/request.service';
import { TimeInspectService } from '../services/reports/time-inspect.service';
import { WorkingTimeService } from '../services/reports/working-time.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { forkJoin, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

  project_name: string = '';

  req_problem: string = '';
  req_daily: string = '';
  req_license: string = '';
  req_certificate: string = '';

  status: boolean = false;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private project: ProjectService,
    private report: ReportService,
    private weatherService: WeatherService,
    private laborService: LaborService,
    private workService: WorkService,
    private toolService: ToolService,
    private matService: MaterialService,
    private problemService: ProblemService,
    private strikeService: StrikeService,
    private inspecService: InspectionService,
    private overdueService: OverdueService,
    private reqService: RequestService,
    private timeInspectService: TimeInspectService,
    private workingTimeService: WorkingTimeService
  ) { }
  ngOnInit() {
    this.project.readOne(this.config.data.project_id).subscribe(data => {
      this.project_name = data['project_name'];
    });

    this.reqService.getReqProject(this.config.data.project_id).subscribe(data => {
      this.req_problem = data['req_problem'];
      this.req_daily = data['req_daily'];
      this.req_license = data['req_license'];
      this.req_certificate = data['req_certificate'];
    });
  }



  deleteAll() {
    const data = {
      req_problem: this.req_problem,
      req_daily: this.req_daily,
      req_license: this.req_license,
      req_certificate: this.req_certificate
    }
    console.log(data);

    const deleteRequests: Observable<any>[] = [
      this.weatherService.deleteProject(this.config.data.project_id),
      this.timeInspectService.deleteProject(this.config.data.project_id),
      this.workingTimeService.deleteProject(this.config.data.project_id),
      this.laborService.deleteProject(this.config.data.project_id),
      this.workService.deleteProject(this.config.data.project_id),
      this.toolService.deleteProject(this.config.data.project_id),
      this.matService.deleteProject(this.config.data.project_id),
      this.problemService.deleteProject(this.config.data.project_id),
      this.strikeService.deleteProject(this.config.data.project_id),
      this.inspecService.deleteProject(this.config.data.project_id),
      this.overdueService.deleteProject(this.config.data.project_id),
      this.reqService.deleteByProject(this.config.data.project_id, data),
      this.report.deleteProject(this.config.data.project_id),
      this.project.delete(this.config.data.project_id),
    ];

    forkJoin(deleteRequests).subscribe(
      (responses: any[]) => {
        // Handle responses
        for (const res of responses) {
          if (res.status === 'success') {
            Swal.fire({
              title: 'สำเร็จ',
              text: 'การลบโครงการสำเร็จ',
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
              text: 'เกิดข้อผิดพลาดในการลบโครงการ',
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
