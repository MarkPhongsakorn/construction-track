import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../services/projects/project.service';
import { ReportService } from '../services/reports/report.service';
import { WeatherService } from '../services/reports/weather.service';
import { LaborService } from '../services/reports/labor.service';
import { WorkService } from '../services/reports/work.service';
import { ToolService } from '../services/reports/tool.service';
import { MaterialService } from '../services/reports/material.service';
import { StrikeService } from '../services/reports/strike.service';
import { InspectionService } from '../services/reports/inspection.service';
@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

  project_name: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private project: ProjectService,
    private report: ReportService,
    private weatherSeervice: WeatherService,
    private laborService: LaborService,
    private workService: WorkService,
    private toolService: ToolService,
    private matService: MaterialService,
    private strikeService: StrikeService,
    private inspecService: InspectionService,
  ) {}
  ngOnInit() {
    this.project.readOne(this.data.project_id).subscribe(data => {
      this.project_name = data['project_name'];
    });
  }
  delete() {
    this.project.delete(this.data.project_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
    this.report.deleteProject(this.data.project_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message);
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
    this.weatherSeervice.deleteProject(this.data.project_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message);
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
    this.laborService.deleteProject(this.data.project_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message);
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
    this.workService.deleteProject(this.data.project_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message);
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
    this.toolService.deleteProject(this.data.project_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message);
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
    this.matService.deleteProject(this.data.project_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message);
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
    this.strikeService.deleteProject(this.data.project_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message);
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
    this.inspecService.deleteProject(this.data.project_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message);
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
  }


}
