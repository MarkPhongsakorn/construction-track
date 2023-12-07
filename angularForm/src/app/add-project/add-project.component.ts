import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';
import { ProjectService } from '../services/projects/project.service';
import { CompanyService } from '../services/companies/company.service';
import { ProjectStatusService } from '../services/reports/project-status.service';
import { format } from 'date-fns-tz';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { isWithinInterval } from 'date-fns';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  user: any[] = [];
  userId: string = '';
  selectUserId: string = '';

  comp: any[] = [];
  selectCompId: string = '';

  project_name: string = '';
  project_start: Date = new Date();
  project_end: Date = new Date();

  psta: any[] = [];
  psta_name: string = '';
  selectPstaId: string = '';


  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private companyService: CompanyService,
    private pstaService: ProjectStatusService,
    public dialogRef: DynamicDialogRef,
  ) { }

  ngOnInit() {
    const user_id = sessionStorage.getItem('user_detail_id');
    if (user_id !== null) {
      this.userService.getUser(user_id).subscribe(data => {
        if (this.userId = data['user_detail_id']) {
          this.selectUserId = this.userId;
        }
      });
    } else {
      console.log('user_id เป็น null');
    }

    this.userService.getUserList().subscribe(data => {
      this.user = data.map((user_detail_id: any) => {
        return {
          ...user_detail_id,
          displayLabel: user_detail_id.user_fname + ' ' + user_detail_id.user_lname
        };
      });
    });

    this.companyService.getComp().subscribe(data => {
      this.comp = data;
    })

    this.pstaService.read().subscribe(data => {
      this.psta = data;
    });

  }


  project() {
    const projectStart = new Date(this.project_start);
    projectStart.setHours(0, 0, 0, 0);
    const projectStartThailand = format(projectStart, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Bangkok' });

    const projectEnd = new Date(this.project_end);
    projectEnd.setHours(0, 0, 0, 0);
    const projectEndThailand = format(projectEnd, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Bangkok' });

    const currentDate = new Date();
    const isProjectInProgress = isWithinInterval(currentDate, { start: projectStart, end: projectEnd });

    const data = {
      project_name: this.project_name,
      project_start: projectStartThailand,
      project_end: projectEndThailand,
      user_detail_id: this.selectUserId,
      comp_id: this.selectCompId,
      psta_id: isProjectInProgress ? "1" : "2"
    };
    this.projectService.createProject(data).subscribe((res: any) => {
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
    })
  }

  closeDialog() {
    this.dialogRef.close(); // เรียกเมื่อต้องการปิด dialog
  }

}
