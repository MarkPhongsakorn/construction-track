import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OverdueService {
  private baseUrl = 'http://localhost/test';

  constructor(
    private http: HttpClient
  ) { }

  create(data: object) {
    return this.http.post(`${this.baseUrl}/backend/api/overdue/create.php`, data)
  }

  delete(dr_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/overdue/delete.php`, { params: { dr_id: dr_id } });
  }

  readOne(dr_id: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/overdue/read_one.php`, { params: { dr_id: dr_id } });
  }

  deleteProject(project_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/overdue/deleteByProject.php`, { params: { project_id: project_id } })
  }

  update(data: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/overdue/update.php`, data);
  }
}