import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddMatNameComponent } from '../add-mat-name/add-mat-name.component';
import { EditMatNameComponent } from '../edit-mat-name/edit-mat-name.component';
import { DeleteMatNameComponent } from '../delete-mat-name/delete-mat-name.component';
import { MatNameService } from '../services/reports/mat-name.service';
@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  row: number = 20; // จำนวนแถวที่แสดงต่อหน้า
  first: number = 0; // ตำแหน่งของหน้าที่กำลังแสดง

  mat_name: any[] = [];
  mat_name_id: string = '';

  checkData: boolean = false;

  ref: DynamicDialogRef | undefined;

  constructor(
    private matNameService: MatNameService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.matNameService.read().subscribe((res: any) => {
      if (res.status === 'error') {
        this.checkData = true;
      } else {
        this.mat_name = res;
        this.checkData = false;
      }
    })
  }

  openDialog() {
    this.ref = this.dialogService.open(AddMatNameComponent, { header: '' });
  }

  openDialog2(mat_name_id: string) {
    this.mat_name_id = mat_name_id;
    this.ref = this.dialogService.open(EditMatNameComponent, {
      data: { mat_name_id: this.mat_name_id }, header: ''
    });
  }

  openDialog3(mat_name_id: string) {
    this.mat_name_id = mat_name_id;
    this.ref = this.dialogService.open(DeleteMatNameComponent, {
      data: { mat_name_id: this.mat_name_id }, header: ''
    });
  }
}
