import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddReportComponent } from '../add-report/add-report.component';
import { ReportService } from '../services/reports/report.service';
import { EditReportComponent } from '../edit-report/edit-report.component';
import { DeleteReportComponent } from '../delete-report/delete-report.component';
import { AddDetailComponent } from '../add-detail/add-detail.component';
import { DetailReportComponent } from '../detail-report/detail-report.component';


@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css'],
  providers: [DialogService]
})
export class DailyReportComponent implements OnInit {

  row: number = 20; // จำนวนแถวที่แสดงต่อหน้า
  first: number = 0; // ตำแหน่งของหน้าที่กำลังแสดง

  reports: any[] = [];

  morning: string = '1';
  afternoon: string = '2';

  ref: DynamicDialogRef | undefined;

  projectID: boolean = false;
  project: string = '';
  dr_id: string = '';

  constructor(
    public dialogService: DialogService,
    private report: ReportService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.project = (+params['project_id']).toString();
      this.loadReportData();
    });

  }

  loadReportData() {
    this.report.getOneByproject(this.project).subscribe(res => {
      // this.date = res['project_name'];
      if (res.status === 'error') {
        this.projectID = true;
      } else {
        this.reports = res;
        this.projectID = false;
      }

    });
  }


  openDialog() {
    this.ref = this.dialogService.open(AddReportComponent, {
      data: { project_id: this.project }, header: ''
    });
  }

  openDialog2(dr_id: string) {
    this.dr_id = dr_id;
    this.ref = this.dialogService.open(EditReportComponent, {
      data: { dr_id: this.dr_id }, header: ''
    });
  }

  openDialog3(dr_id: string) {
    this.dr_id = dr_id;
    this.ref = this.dialogService.open(DeleteReportComponent, {
      data: { dr_id: this.dr_id }, header: ''
    });
  }

  openDialog4(dr_id: string) {
    this.dr_id = dr_id;
    this.ref = this.dialogService.open(AddDetailComponent, {
      data: { dr_id: this.dr_id, project_id: this.project }, header: ''
    });
  }

  openDialog5(dr_id: string) {
    this.dr_id = dr_id;
    this.ref = this.dialogService.open(DetailReportComponent, {
      data: { dr_id: this.dr_id, project_id: this.project }, header: ''
    });
  }

}
