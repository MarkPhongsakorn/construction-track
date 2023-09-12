import { Component } from '@angular/core';
import { RequestService } from '../services/companies/request.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-request-user',
  templateUrl: './add-request-user.component.html',
  styleUrls: ['./add-request-user.component.css']
})
export class AddRequestUserComponent {
  
  selectedFile: File | null = null;

  constructor(
    private request: RequestService
  ){}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  
  onUpload() {
    if (this.selectedFile) {
      this.request.uploadFile(this.selectedFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            // ควบคุมความคืบหน้าการอัปโหลดไฟล์ที่นี่
            const percentDone = Math.round((100 * event.loaded) / event.total);
            console.log(`อัปโหลด: ${percentDone}%`);
          } else if (event.type === HttpEventType.Response) {
            // ประมวลผลการตอบสนองหลังจากการอัปโหลดไฟล์ที่นี่
            console.log('อัปโหลดสำเร็จ!', event.body);
          }
        },
        (error: HttpErrorResponse) => {
          console.error('เกิดข้อผิดพลาดในการอัปโหลดไฟล์:', error);
        }
      );
    }
  }
}
