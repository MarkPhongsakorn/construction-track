import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { ToolNameService } from '../services/reports/tool-name.service';

@Component({
  selector: 'app-delete-tool-name',
  templateUrl: './delete-tool-name.component.html',
  styleUrls: ['./delete-tool-name.component.css']
})
export class DeleteToolNameComponent implements OnInit {
  tool_name: string = '';

  constructor(
    private toolService: ToolNameService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.toolService.readOne(this.config.data.tool_name_id).subscribe(data => {
      this.tool_name = data['tool_name'];
    })
  }

  delete() {
    this.toolService.delete(this.config.data.tool_name_id).subscribe((res: any) => {
      if (res.status === 'success') {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'การลบข้อมูลสำเร็จ',
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
          text: 'เกิดข้อผิดพลาดในการลบข้อมูล',
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
