import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddReportComponent } from '../add-report/add-report.component';
import { ReportService } from '../services/reports/report.service';
import { EditReportComponent } from '../edit-report/edit-report.component';
import { DeleteReportComponent } from '../delete-report/delete-report.component';
import { AddDetailComponent } from '../add-detail/add-detail.component';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent implements OnInit {

  dataSource: any[] = [];
  displayedColumns: string[] = [
    'dr_id',
    'dr_time',
    'problem',
    'project_name',
    'user_detail',
    'detail',
    'action'
  ];

  projectID: boolean = false;
  project: string = '';
  dr_id: string = '';
  
  constructor(
    public dialog: MatDialog,
    private report: ReportService,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.project = (+params['project_id']).toString();
      this.loadReportData();
    });
  }
  
  loadReportData() {
    this.report.getOneByproject(this.project).subscribe(res => {
      this.dataSource = res;
      if (res.status === 'error') {
        this.projectID = true;
      } else {
        this.projectID = false;
      }
    });
  }
  
  openDialog() {
    this.dialog.open(AddReportComponent);
  }

  openDialog2(dr_id: string) {
    this.dr_id = dr_id;
    const dialogRef = this.dialog.open(EditReportComponent, {
      data: {dr_id: this.dr_id}
    });
  }

  openDialog3(dr_id: string) {
    this.dr_id = dr_id;
    const dialogRef = this.dialog.open(DeleteReportComponent, {
      data: {dr_id: this.dr_id}
    });
  }

  openDialog4(dr_id: string) {
    this.dr_id = dr_id;
    const dialogRef = this.dialog.open(AddDetailComponent, {
      data: {dr_id: this.dr_id}
    });
  }

  openDialog5() {

  }

}
