import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = environment.baseUrl;


  constructor(
    private http: HttpClient
  ) { }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/request/create.php`, formData);
  }

  updateFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/request/update.php`, formData);
  }


  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/backend/api/request/read.php`);
  }

  getOne(req_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/backend/api/request/read_one.php`, { params: { req_id: req_id } });
  }

  getReq(project_id: string, comp_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/backend/api/request/readByID.php`, { params: { project_id: project_id, comp_id: comp_id } });
  }

  delete(req_id: string, data: Object) {
    return this.http.delete(`${this.baseUrl}/backend/api/request/delete.php`, { params: { req_id: req_id }, body: data });
  }

  getReqProject(project_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/backend/api/request/readByProject.php`, { params: { project_id: project_id } });
  }

  deleteByProject(project_id: string, data: Object) {
    return this.http.delete(`${this.baseUrl}/backend/api/request/deleteByProject.php`, { params: { project_id: project_id }, body: data });
  }

}
