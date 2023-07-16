import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { DeleteProjectComponent } from '../delete-project/delete-project.component';
import { ProjectService } from '../services/projects/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataSource: any[] = [];
  errorMessage: string = '';
  displayedColumns: string[] = [
    'project_id',
    'project_name',
    'project_start',
    'project_end',
    'user_fname user_lname',
    'comp_name',
    'action'
  ];

  projectID: boolean = false;

  project_id: string = '';

  constructor(
    public dialog: MatDialog,
    private project: ProjectService
  ) {}

  ngOnInit() {
    this.project.readProject().subscribe(res => {
      this.dataSource = res;
      if (res.status === 'error') {
        return this.projectID = true;
      } else {
        return this.projectID;
      }
    });
  }


  openDialog() {
    this.dialog.open(AddProjectComponent);
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
