import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private baseUrl = environment.baseUrl;


  constructor(private http: HttpClient) { }

  downloadFiles(req_id: string): Observable<Blob> {
    // ส่งรายการชื่อไฟล์ที่ต้องการดาวน์โหลดไปที่ API
    const params = new HttpParams().set('req_id', req_id);
    const headers = new HttpHeaders().set('Accept', 'application/pdf');

    return this.http.get(`${this.baseUrl}backend/api/request/download.php`, {
      headers,
      params,
      responseType: 'blob',
    });
  }

  saveFile(blob: Blob, fileNames: string[]): void {
    for (let i = 0; i < fileNames.length; i++) {
      saveAs(blob, fileNames[i]);

    }
    console.log('Total Blob size:', blob.size, 'bytes');
  }


}