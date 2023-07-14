import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/users/user.service';
import { ProjectService } from '../services/projects/project.service';
import { CompanyService } from '../services/companies/company.service';
import { format } from 'date-fns-tz';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  user: any[] = [];
  selectUserId: string = '';

  comp: any[] = [];
  selectCompId: string = '';

  project_name: string = '';
  project_start: Date = new Date();
  project_end: Date = new Date();

  constructor (
    private router: Router,
    private userService: UserService,
    private projectService: ProjectService,
    private companyService: CompanyService
  ) {}
  
  ngOnInit() {
    this.userService.getUserList().subscribe(data => {
      this.user = data;
    });
    this.companyService.getComp().subscribe(data => {
      this.comp = data;
    })
  }

  project() {
    const projectStart = new Date(this.project_start);
    projectStart.setHours(0, 0, 0, 0);
    const projectStartThailand = format(projectStart, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Bangkok' });

    const projectEnd = new Date(this.project_end);
    projectEnd.setHours(0, 0, 0, 0);
    const projectEndThailand = format(projectEnd, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Bangkok' });

    const data = {
      project_name: this.project_name,
      project_start: projectStartThailand,
      project_end: projectEndThailand,
      user_detail_id: this.selectUserId,
      comp_id: this.selectCompId
    };
    this.projectService.createProject(data).subscribe((res: any) => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    })
  }

}
