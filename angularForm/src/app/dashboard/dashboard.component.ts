import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    public dialog: MatDialog
  ) {}

  openDialog() {
    this.dialog.open(AddProjectComponent);
  }

}
export class DialogContent {}