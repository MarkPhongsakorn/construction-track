import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaborService {
  private baseUrl = 'http://localhost/test';

  constructor(
    private http: HttpClient
  ) { }

  create(data: object) : Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/labor/create.php`, data);
  }

  delete(dr_id: string) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/labor/delete.php`,{ params: { dr_id: dr_id } });
  }

  readOne(dr_id: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/labor/read_one.php`,{ params: { dr_id: dr_id } });
  }

  deleteProject(project_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/labor/deleteByProject.php`,{ params: { project_id: project_id } })
  }

  update(data: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/labor/update.php`, data);
  }

}
