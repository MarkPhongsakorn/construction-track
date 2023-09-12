import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = 'http://localhost/test';

  constructor(
    private http: HttpClient
  ) { }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.baseUrl}/backend/api/request/create.php`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getReq(project_id: string, comp_id: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/request/read_one.php`,{ params: { project_id: project_id, comp_id: comp_id } });
  }
}
