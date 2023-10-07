import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  // errorMessage: string = '';
  // displayedColumns: string[] = [
  //   'project_id',
  //   'project_name',
  //   'project_start',
  //   'project_end',
  //   'user_fname user_lname',
  //   'comp_name',
  //   'action'
  // ];

  projectID: boolean = false;

  project_id: string = '';

  ref: DynamicDialogRef | undefined;


  constructor(
    public dialog: MatDialog,
    private project: ProjectService,
    private report: ReportService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.project.readProject().subscribe(res => {
      this.projects = res;
      if (res.status === 'error') {
        return this.projectID = true;
      } else {
        return this.projectID;
      }
    });
  }


  openDialog() {
    this.ref = this.dialogService.open(AddProjectComponent, { header: ''});
  }

  openDialog2(project_id: string) {
     this.project_id = project_id;
    const dialogRef = this.dialog.open(EditProjectComponent, {
      data: {project_id: this.project_id}
    });
  }

  openDialog3(project_id: string) {
    this.project_id = project_id;
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      data: {project_id: this.project_id}
    });
  }


}
