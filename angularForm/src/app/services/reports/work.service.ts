import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private baseUrl = environment.baseUrl;


  constructor(
    private http: HttpClient
  ) { }

  create(data: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/work/create.php`, data);
  }

  delete(dr_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/work/delete.php`, { params: { dr_id: dr_id } });
  }

  readOne(dr_id: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/work/read_one.php`, { params: { dr_id: dr_id } });
  }

  deleteProject(project_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/work/deleteByProject.php`, { params: { project_id: project_id } })
  }

  update(data: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/work/update.php`, data);
  }
}
