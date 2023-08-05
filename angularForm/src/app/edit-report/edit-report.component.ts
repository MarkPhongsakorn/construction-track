import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/users/user.service';
import { ReportService } from '../services/reports/report.service';
import { ProjectService } from '../services/projects/project.service';
import { format } from 'date-fns-tz';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit {

  user: any[] = [];
  selectUserId: string = '';

  project: any[] = [];
  selectProjectId: string = '';

  dr_id: string = '';
  dr_time: Date = new Date();
  problem: string = '';

  projectID: string = '';

  project_id: string = '';
  project_name: string = '';
  user_detail_id: string = '';
  user_fname: string = '';
  user_lname: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private reportService: ReportService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.reportService.getOneReport(this.data.dr_id).subscribe(data => {
      this.dr_time = data['dr_time'];
      if (this.project_id = data['project_id']) {
        this.selectProjectId = this.project_id
      }
      if (this.user_detail_id = data['user_detail_id']) {
        this.selectUserId = this.user_detail_id
      }
    });

    this.userService.getUserList().subscribe(data => {
      this.user = data;
    });
    this.projectService.readProject().subscribe(data => {
      this.project = data;
    })
  }

  update() {
    const drTime = new Date(this.dr_time);
    drTime.setHours(0, 0, 0, 0);
    const drTimeThai = format(drTime, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Bangkok' });

    const data = {
      dr_id: this.data.dr_id,
      dr_time: drTimeThai,
      project_id: this.selectProjectId,
      user_detail_id: this.selectUserId
    };
    this.reportService.update(data).subscribe((res: any) => {
      if (res.status === 'success') {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'การสร้างโครงการสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        console.log(res.message); // Failed to create user
        Swal.fire({
          title: 'ข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการสร้างโครงการ',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    });
  }

}
