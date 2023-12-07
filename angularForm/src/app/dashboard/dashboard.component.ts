import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { DeleteProjectComponent } from '../delete-project/delete-project.component';
import { ProjectService } from '../services/projects/project.service';
import { ReportService } from '../services/reports/report.service';
import { isWithinInterval } from 'date-fns';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DialogService]
})
export class DashboardComponent implements OnInit {

  row: number = 10; // จำนวนแถวที่แสดงต่อหน้า
  first: number = 0; // ตำแหน่งของหน้าที่กำลังแสดง

  projects: any[] = [];

  projectID: boolean = false;

  project_id: string = '';

  ref: DynamicDialogRef | undefined;

  psta_id: string[] = [];
  projects_id: string[] = [];
  start: string[] = [];
  end: string[] = [];


  constructor(
    private project: ProjectService,
    private report: ReportService,
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    this.project.readProject().subscribe((res: any) => {
      if (res.status === 'error') {
        this.projectID = true;
      } else {
        this.projects = res;
        const currentDate = new Date();

        this.projects.forEach((project: any) => {
          const projectStart = new Date(project.project_start);
          const projectEnd = new Date(project.project_end);
          const overdue = isWithinInterval(currentDate, { start: projectStart, end: projectEnd });
          const data = {
            project_id: project.project_id,
            psta_id: overdue ? "1" : "2"
          }
          if (project.psta_id != '3' && project.psta_id != '4') {
            this.project.updatePsta(data).subscribe((res: any) => {
              if (res.status === 'success') {
                return true;
              } else {
                return false;
              }
            })
          }
        });
        this.projectID = false;
      }
    });
  }


  openDialog() {
    this.ref = this.dialogService.open(AddProjectComponent, { header: '' });
  }

  openDialog2(project_id: string) {
    this.project_id = project_id;
    this.ref = this.dialogService.open(EditProjectComponent, {
      data: { project_id: this.project_id }, header: ''
    });
  }

  openDialog3(project_id: string) {
    this.project_id = project_id;
    this.ref = this.dialogService.open(DeleteProjectComponent, {
      data: { project_id: this.project_id }, header: ''
    });
  }


}
