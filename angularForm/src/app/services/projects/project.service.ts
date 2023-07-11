import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost/test';

  constructor(
    private http: HttpClient
  ) { }

  createProject(user: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/project/create.php`, user);
  }

  readProject(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/project/read.php`);
  }

  update(project_id: string, data: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/project/update.php`, data, { params: { project_id: project_id } });
  }
  

  delete(project_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/project/delete.php?id=${project_id}`);
  }

  readOne(project_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/backend/api/project/read_one.php`,{ params: { project_id: project_id } });
  }


}
