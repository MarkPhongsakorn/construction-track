import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/projects/project.service';
import { CompanyService } from '../services/companies/company.service';
import { RequestService } from '../services/companies/request.service';

@Component({
  selector: 'app-request-admin',
  templateUrl: './request-admin.component.html',
  styleUrls: ['./request-admin.component.css']
})
export class RequestAdminComponent implements OnInit {
  project: any[] = [];
  selectProjectId: string = '';

  projectID: boolean = false;

  comp: any[] = [];
  selectCompId: string = '';

  dataSource: any[] = [];
  displayedColumns: string[] = [
    'req_id',
    'req_problem',
    'req_daily',
    'req_license',
    'req_certificate',
    // 'project_id',
    // 'comp_id',
  ];

  constructor(
    private projectService: ProjectService,
    private compService: CompanyService,
    private req: RequestService,
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
      this.dataSource = res;

      if (res.status === 'error') {
        this.projectID = true;
      } else {
        this.projectID = false;
      }
    });
  }
}
