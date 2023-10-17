import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ProjectService } from '../services/projects/project.service';
import { CompanyService } from '../services/companies/company.service';
import { RequestService } from '../services/companies/request.service';

@Component({
  selector: 'app-request-admin',
  templateUrl: './request-admin.component.html',
  styleUrls: ['./request-admin.component.css'],
  providers: [DialogService]
})
export class RequestAdminComponent implements OnInit {
  project: any[] = [];
  selectProjectId: string = '';

  projectID: boolean = false;

  comp: any[] = [];
  selectCompId: string = '';

  request: any[] = [];
  isSearchPerformed: boolean = false;


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
    this.req.getReq(this.selectProjectId,this.selectCompId).subscribe((res: any) => {
      if (res.status === 'error') {
        this.projectID = true;
      } else {
        this.request = res;
        this.projectID = false;
      }
      this.isSearchPerformed = true;
    });
    
  }
}
