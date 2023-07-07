import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/users/user.service';
import { ProjectService } from '../services/projects/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  user: any[] = [];
  selectUserId: string = '';

  project_name: string = '';
  project_start: Date = new Date();
  project_end: Date = new Date();

  constructor (
    private router: Router,
    private userService: UserService,
    private projectService: ProjectService
  ) {}
  
  ngOnInit() {
    this.userService.getUserList().subscribe(data => {
      this.user = data;
    });
  }

  project() {
    const data = {
      project_name: this.project_name,
      project_start: this.project_start,
      project_end: this.project_end,
      user_detail_id: this.selectUserId
    };
    this.projectService.createProject(data).subscribe((res: any) => {
      if (res.status === 'success') {
        this.router.navigate(['/dashboard']);
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    })
  }

}
