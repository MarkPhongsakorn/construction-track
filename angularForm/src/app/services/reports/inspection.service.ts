import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  private baseUrl = 'http://localhost/construction-track';

  constructor(
    private http: HttpClient
  ) { }

  create(data: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/inspection/create.php`, data);
  }

  delete(dr_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/inspection/delete.php`, { params: { dr_id: dr_id } });
  }

  readOne(dr_id: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/inspection/read_one.php`, { params: { dr_id: dr_id } });
  }

  deleteProject(project_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/inspection/deleteByProject.php`, { params: { project_id: project_id } })
  }

  update(data: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/inspection/update.php`, data);
  }
}