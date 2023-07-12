import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/projects/project.service';
import { UserService } from '../services/users/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'date-fns-tz';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  user: any[] = [];
  users:any[]=[];
  selected: string = '';
  selectUserId: string = '';
  

  project_id: string = '';
  project_name: string = '';
  project_start: Date =  new Date();
  project_end: Date =  new Date();
  user_detail_id: string = '';
  user_fname: string = '';
  user_lname: string = '';
  

  constructor(
    public dialogRef1: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private project: ProjectService,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit() {

    this.project.readOne(this.data.project_id).subscribe(data => {
      this.project_name = data['project_name'];
      this.project_start = data['project_start'];
      this.project_end = data['project_end'];
      this.user_fname = data['user_fname'];
      this.user_lname = data['user_lname'];
      return this.selected = data['user_detail_id'];
    });
    
    this.userService.getUserList().subscribe(data => {
      return this.user = data;
    });
    
  }
  
  update() {
    const projectStart = new Date(this.project_start);
    projectStart.setHours(0, 0, 0, 0);
    const projectStartThailand = format(projectStart, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Bangkok' });

    const projectEnd = new Date(this.project_end);
    projectEnd.setHours(0, 0, 0, 0);
    const projectEndThailand = format(projectEnd, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Bangkok' });

    const data = {
      project_id: this.data.project_id,
      project_name: this.project_name,
      project_start: projectStartThailand,
      project_end: projectEndThailand,
      user_detail_id: this.selectUserId
    };
    this.project.update(data).subscribe((res: any) => {
      if (res.status === 'success') {
        // window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    })
  }
  
  onSubmit() {
    
  }
  

}
