import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { ToolNameService } from '../services/reports/tool-name.service';

@Component({
  selector: 'app-edit-tool-name',
  templateUrl: './edit-tool-name.component.html',
  styleUrls: ['./edit-tool-name.component.css']
})
export class EditToolNameComponent implements OnInit {

  tool_name: string = '';

  constructor(
    private toolNameService: ToolNameService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.toolNameService.readOne(this.config.data.tool_name_id).subscribe(data => {
      this.tool_name = data['tool_name'];
    })
  }

  update() {
    const data = {
      tool_name_id: this.config.data.tool_name_id,
      tool_name: this.tool_name
    }
    this.toolNameService.update(data).subscribe((res: any) => {
      if (res.status === 'success') {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'การแก้ไขข้อมูลสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        console.log(res.message); // Failed to create user
        Swal.fire({
          title: 'ข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    })
  }

  closeDialog() {
    this.dialogRef.close(); // เรียกเมื่อต้องการปิด dialog
  }
}
