import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CompanyService } from '../services/companies/company.service';
import { AddCompanyComponent } from '../add-company/add-company.component';
import { EditCompanyComponent } from '../edit-company/edit-company.component';
import { DeleteCompanyComponent } from '../delete-company/delete-company.component';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
  providers: [DialogService]
})
export class CompanyDetailComponent implements OnInit {

  row: number = 20; // จำนวนแถวที่แสดงต่อหน้า
  first: number = 0; // ตำแหน่งของหน้าที่กำลังแสดง

  company: any[] = [];
  comp_id: string = '';

  comp: boolean = false;

  addComp: boolean = false;

  ref: DynamicDialogRef | undefined;

  constructor(
    private compService: CompanyService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.compService.getComp().subscribe((res: any) => {
      if (res.status === 'error') {
        this.comp = true;
      } else {
        this.company = res;
        this.comp = false;
      }
    });

    const posId = sessionStorage.getItem('pos_id');
    if (posId === '1') {
      this.addComp = true;
    } else {
      this.addComp = false;
    }

  }

  openDialog() {
    this.ref = this.dialogService.open(AddCompanyComponent, { header: '' });
  }

  openDialog2(comp_id: string) {
    this.comp_id = comp_id;
    this.ref = this.dialogService.open(EditCompanyComponent, {
      data: { comp_id: this.comp_id }, header: ''
    });
  }

  openDialog3(comp_id: string) {
    this.comp_id = comp_id;
    this.ref = this.dialogService.open(DeleteCompanyComponent, {
      data: { comp_id: this.comp_id }, header: ''
    });
  }
}
