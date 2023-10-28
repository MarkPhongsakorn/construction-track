import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjectService } from '../services/projects/project.service';
import { CompanyService } from '../services/companies/company.service';
import { RequestService } from '../services/companies/request.service';
import { AddRequestUserComponent } from '../add-request-user/add-request-user.component';

@Component({
  selector: 'app-request-user',
  templateUrl: './request-user.component.html',
  styleUrls: ['./request-user.component.css'],
  providers: [DialogService]
})
export class RequestUserComponent implements OnInit {

  project: any[] = [];
  selectProjectId: string = '';

  projectID: boolean = false;
  addReq: boolean = false;

  comp: any[] = [];
  selectCompId: string = '';

  request: any[] = [];
  isSearchPerformed: boolean = false;

  ref: DynamicDialogRef | undefined;

  constructor(
    private projectService: ProjectService,
    private compService: CompanyService,
    private req: RequestService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.projectService.readProject().subscribe(data => {
      this.project = data;
    });
    this.compService.getComp().subscribe(data => {
      this.comp = data;
    });
  }

  search() {
    this.req.getReq(this.selectProjectId,this.selectCompId).subscribe(res => {
      if (res.status === 'error') {
        this.projectID = true;
      } else {
        this.request = res;
        console.log(this.request);
        
        this.projectID = false;
      }
      this.isSearchPerformed = true;
    });
    if (this.selectProjectId == '' && this.selectCompId == '') {
      this.addReq = false;
    } else {
      this.addReq = true;
    }
  }

  openDialog() {
    this.ref = this.dialogService.open(AddRequestUserComponent, {
      data: { project_id: this.selectProjectId, comp_id: this.selectCompId }, header: ''
    });
  }

}
