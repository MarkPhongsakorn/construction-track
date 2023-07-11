import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/projects/project.service';
import { UserService } from '../services/users/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  user: any[] = [];
  users:any[]=[];
  selectUserId: string = '';

  project_id: string = '';
  project_name: string = '';
  project_start: Date =  new Date();
  project_end: Date =  new Date();
  user_detail_id: string = '';
  user_fname: string = '';
  user_lname: string = '';
  

  constructor(
    public dialogRef: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private project: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit() {

    this.project.readOne(this.data.project_id).subscribe(data => {
      this.project_name = data['project_name'];
      this.project_start = data['project_start'];
      this.project_end = data['project_end'];
      return this.user_fname = data['user_fname'],
      this.user_lname = data['user_lname']
    });
    
    this.userService.getUserList().subscribe(data => {
      return this.user = data;
    });
    
  }
  
  update() {
   
  }
  
  onSubmit() {
    
  }
  

}
