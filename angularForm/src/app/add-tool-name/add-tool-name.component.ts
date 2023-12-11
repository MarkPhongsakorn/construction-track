import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { ToolNameService } from '../services/reports/tool-name.service';

@Component({
  selector: 'app-add-tool-name',
  templateUrl: './add-tool-name.component.html',
  styleUrls: ['./add-tool-name.component.css']
})
export class AddToolNameComponent implements OnInit {
  tool_name: string = '';

  constructor(
    private toolNameService: ToolNameService,
    public dialogRef: DynamicDialogRef,
  ) { }

  ngOnInit(): void {

  }

  create() {
    const data = {
      tool_name: this.tool_name
    }
    this.toolNameService.create(data).subscribe((res: any) => {
      if (res.status === 'success') {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'การเพิ่มข้อมูลสำเร็จ',
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
          text: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล',
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
