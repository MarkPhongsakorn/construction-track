import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/users/user.service';
import { ProjectService } from '../services/projects/project.service';
import { ReportService } from '../services/reports/report.service';
import { format } from 'date-fns-tz';


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
  problem: string = '';

  projectID: string = '';

  project_name: string = '';
  user_detail_id: string = '';

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private reportService: ReportService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(){
    this.userService.getUserList().subscribe(data => {
      this.user = data;
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
      problem: this.problem,
      project_id: this.selectProjectId,
      user_detail_id: this.selectUserId
    };
    this.reportService.create(data).subscribe((res: any) => {
      if (res.status === "success") {
        window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
  }
}
