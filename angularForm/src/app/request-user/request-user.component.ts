import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjectService } from '../services/projects/project.service';
import { CompanyService } from '../services/companies/company.service';
import { RequestService } from '../services/companies/request.service';
import { AddRequestUserComponent } from '../add-request-user/add-request-user.component';
import { EditRequestUserComponent } from '../edit-request-user/edit-request-user.component';
import { DeleteRequestUserComponent } from '../delete-request-user/delete-request-user.component';


@Component({
  selector: 'app-request-user',
  templateUrl: './request-user.component.html',
  styleUrls: ['./request-user.component.css'],
  providers: [DialogService]
})
export class RequestUserComponent implements OnInit {

  row: number = 10; // จำนวนแถวที่แสดงต่อหน้า
  first: number = 0; // ตำแหน่งของหน้าที่กำลังแสดง


  project: any[] = [];
  selectProjectId: string = '';

  projectID: boolean = false;

  comp: any[] = [];
  selectCompId: string = '';

  request: any[] = [];
  reqAll: any[] = [];
  isSearchPerformed: boolean = false;

  req_id: string = '';

  ref: DynamicDialogRef | undefined;

  constructor(
    private projectService: ProjectService,
    private compService: CompanyService,
    private req: RequestService,
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    this.projectService.readProject().subscribe(data => {
      this.project = data;
    });
    this.compService.getComp().subscribe(data => {
      this.comp = data;
    });
    this.req.getAll().subscribe(data => {
      this.reqAll = data;
    });
  }

  search() {
    this.req.getReq(this.selectProjectId, this.selectCompId).subscribe((res: any) => {
      if (res.status === 'error') {
        this.projectID = true;
      } else {
        this.request = res;
        this.projectID = false;
      }
      this.isSearchPerformed = true;
    });
  }



  openDialog() {
    this.ref = this.dialogService.open(AddRequestUserComponent, {
      data: { project_id: this.selectProjectId, comp_id: this.selectCompId }, header: ''
    });
  }

  openDialog2(req_id: string) {
    this.req_id = req_id;
    this.ref = this.dialogService.open(EditRequestUserComponent, {
      data: { req_id: this.req_id }, header: ''
    });
  }

  openDialog3(req_id: string) {
    this.req_id = req_id;
    this.ref = this.dialogService.open(DeleteRequestUserComponent, {
      data: { req_id: this.req_id }, header: ''
    });
  }
}
