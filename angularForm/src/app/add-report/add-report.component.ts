import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/users/user.service';
import { ProjectService } from '../services/projects/project.service';
import { ReportService } from '../services/reports/report.service';
import { format } from 'date-fns-tz';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {

  user: any[] = [];
  selectUserId: string = '';

  project: any[] = [];
  selectProjectId: string = '';

  dr_time: Date = new Date();

  projectID: string = '';

  project_name: string = '';
  user_detail_id: string = '';

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private reportService: ReportService,
    public route: ActivatedRoute,
    public dialogRef: DynamicDialogRef
  ) {}

  ngOnInit(){
    this.userService.getUserList().subscribe(data => {
      this.user = data;
      this.user = this.user.map((user_detail_id: any) => {
        return {
          ...user_detail_id,
          displayLabel: user_detail_id.user_fname + ' ' + user_detail_id.user_lname
        };
      });
    });
    this.projectService.readProject().subscribe(data => {
      this.project = data;
    })
  }

  report() {
    const drTime = new Date(this.dr_time);
    drTime.setHours(0, 0, 0, 0);
    const drTimeThai = format(drTime, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Bangkok' });

    const data = {
      dr_time: drTimeThai,
      project_id: this.selectProjectId,
      user_detail_id: this.selectUserId
    };
    this.reportService.create(data).subscribe((res: any) => {
      if (res.status === "success") {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'การสร้างรายงานสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        console.log(res.message);
        Swal.fire({
          title: 'ข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการสร้างรายงาน',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    });
  }

  closeDialog() {
    this.dialogRef.close(); // เรียกเมื่อต้องการปิด dialog
  }
}
