import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/projects/project.service';
import { UserService } from '../services/users/user.service';
import { CompanyService } from '../services/companies/company.service';
import { format } from 'date-fns-tz';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  user: any[] = [];
  users:any[]=[];
  selectUserId: string = '';

  comp: any[] = [];
  selectCompId: string = '';
  

  project_id: string = '';
  project_name: string = '';
  project_start: Date =  new Date();
  project_end: Date =  new Date();
  user_detail_id: string = '';
  user_fname: string = '';
  user_lname: string = '';
  comp_id: string = '';
  

  constructor(
    private project: ProjectService,
    private router: Router,
    private userService: UserService,
    private companyService: CompanyService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {

    this.project.readOne(this.config.data.project_id).subscribe(data => {
      this.project_name = data['project_name'];
      this.project_start = new Date(data['project_start']);
      this.project_end = new Date(data['project_end']);
      if (this.user_detail_id = data['user_detail_id']) {
        this.selectUserId = this.user_detail_id
      }
      if (this.comp_id = data['comp_id']) {
        this.selectCompId = this.comp_id
      }
      
    });
    
    this.userService.getUserList().subscribe(data => {
      this.user = data;
      this.user = this.user.map((user_detail_id: any) => {
        return {
          ...user_detail_id,
          displayLabel: user_detail_id.user_fname + ' ' + user_detail_id.user_lname
        };
      });
    });

    this.companyService.getComp().subscribe(data => {
      return this.comp = data;
    })

    
  }
  
  update() {
    const projectStart = new Date(this.project_start);
    projectStart.setHours(0, 0, 0, 0);
    const projectStartThailand = format(projectStart, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Bangkok' });

    const projectEnd = new Date(this.project_end);
    projectEnd.setHours(0, 0, 0, 0);
    const projectEndThailand = format(projectEnd, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Bangkok' });

    const data = {
      project_id: this.config.data.project_id,
      project_name: this.project_name,
      project_start: projectStartThailand,
      project_end: projectEndThailand,
      user_detail_id: this.selectUserId,
      comp_id: this.comp_id
    };
    this.project.update(data).subscribe((res: any) => {
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
