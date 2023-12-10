import { Component, OnInit } from '@angular/core';
import { LaborNameService } from '../services/reports/labor-name.service';
import { AddLaborNameComponent } from '../add-labor-name/add-labor-name.component';
import { EditLaborNameComponent } from '../edit-labor-name/edit-labor-name.component';
import { DeleteLaborNameComponent } from '../delete-labor-name/delete-labor-name.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styleUrls: ['./labor.component.css']
})
export class LaborComponent implements OnInit {

  row: number = 20; // จำนวนแถวที่แสดงต่อหน้า
  first: number = 0; // ตำแหน่งของหน้าที่กำลังแสดง

  labor_name: any[] = [];
  labor_name_id: string = '';

  checkData: boolean = false;

  ref: DynamicDialogRef | undefined;

  constructor(
    private laborNameService: LaborNameService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.laborNameService.read().subscribe((res: any) => {
      if (res.status === 'error') {
        this.checkData = true;
      } else {
        this.labor_name = res;
        this.checkData = false;
      }
    })
  }

  openDialog() {
    this.ref = this.dialogService.open(AddLaborNameComponent, { header: '' });
  }

  openDialog2(labor_name_id: string) {
    this.labor_name_id = labor_name_id;
    this.ref = this.dialogService.open(EditLaborNameComponent, {
      data: { labor_name_id: this.labor_name_id }, header: ''
    });
  }

  openDialog3(labor_name_id: string) {
    this.labor_name_id = labor_name_id;
    this.ref = this.dialogService.open(DeleteLaborNameComponent, {
      data: { labor_name_id: this.labor_name_id }, header: ''
    });
  }
}
