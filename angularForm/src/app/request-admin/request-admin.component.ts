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
  isSearching: boolean = false;

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
    // ถ้ากำลังทำการค้นหาอยู่แล้ว ไม่ต้องทำอะไรเพิ่ม
    if (this.isSearching) {
      return;
    }

    // ตั้งค่าให้ isSearching เป็น true เพื่อบอกว่ากำลังทำการค้นหา
    this.isSearching = true;

    this.req.getReq(this.selectProjectId, this.selectCompId).subscribe((res: any) => {
      if (res.status === 'error') {
        this.projectID = true;
      } else {
        this.request = res;
        this.projectID = false;
      }
      this.isSearchPerformed = true;

      // เมื่อทำงานเสร็จสิ้น ตั้งค่า isSearching เป็น false
      this.isSearching = false;
    });
  }
}
