import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { DeleteProjectComponent } from '../delete-project/delete-project.component';
import { ProjectService } from '../services/projects/project.service';
import { ReportService } from '../services/reports/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DialogService]
})
export class DashboardComponent implements OnInit {

  projects: any[] = [];

  projectID: boolean = false;

  project_id: string = '';

  ref: DynamicDialogRef | undefined;


  constructor(
    private project: ProjectService,
    private report: ReportService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.project.readProject().subscribe((res: any) => {
      // this.projects = res;
      if (res.status === 'error') {
        return this.projectID = true;
      } else {
        this.projects = res;
        console.log(this.projects);
        
        return this.projectID = false;
      }
    });
  }


  openDialog() {
    this.ref = this.dialogService.open(AddProjectComponent, { header: ''});
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
