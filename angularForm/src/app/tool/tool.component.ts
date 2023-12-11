import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddToolNameComponent } from '../add-tool-name/add-tool-name.component';
import { EditToolNameComponent } from '../edit-tool-name/edit-tool-name.component';
import { DeleteToolNameComponent } from '../delete-tool-name/delete-tool-name.component';
import { ToolNameService } from '../services/reports/tool-name.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {
  row: number = 20; // จำนวนแถวที่แสดงต่อหน้า
  first: number = 0; // ตำแหน่งของหน้าที่กำลังแสดง

  tool_name: any[] = [];
  tool_name_id: string = '';

  checkData: boolean = false;

  ref: DynamicDialogRef | undefined;

  constructor(
    private toolNameService: ToolNameService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.toolNameService.read().subscribe((res: any) => {
      if (res.status === 'error') {
        this.checkData = true;
      } else {
        this.tool_name = res;
        this.checkData = false;
      }
    })
  }

  openDialog() {
    this.ref = this.dialogService.open(AddToolNameComponent, { header: '' });
  }

  openDialog2(tool_name_id: string) {
    this.tool_name_id = tool_name_id;
    this.ref = this.dialogService.open(EditToolNameComponent, {
      data: { tool_name_id: this.tool_name_id }, header: ''
    });
  }

  openDialog3(tool_name_id: string) {
    this.tool_name_id = tool_name_id;
    this.ref = this.dialogService.open(DeleteToolNameComponent, {
      data: { tool_name_id: this.tool_name_id }, header: ''
    });
  }
}
