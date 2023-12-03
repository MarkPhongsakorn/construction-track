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
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { forkJoin, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

  project_name: string = '';

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
    private overdueService: OverdueService
  ) { }
  ngOnInit() {
    this.project.readOne(this.config.data.project_id).subscribe(data => {
      this.project_name = data['project_name'];
    });
  }



  deleteAll() {
    const deleteRequests: Observable<any>[] = [
      this.weatherService.deleteProject(this.config.data.project_id),
      this.laborService.deleteProject(this.config.data.project_id),
      this.workService.deleteProject(this.config.data.project_id),
      this.toolService.deleteProject(this.config.data.project_id),
      this.matService.deleteProject(this.config.data.project_id),
      this.problemService.deleteProject(this.config.data.project_id),
      this.strikeService.deleteProject(this.config.data.project_id),
      this.inspecService.deleteProject(this.config.data.project_id),
      this.overdueService.deleteProject(this.config.data.project_id),
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
