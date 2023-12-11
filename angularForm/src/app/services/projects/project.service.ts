import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost/construction-track';

  constructor(
    private http: HttpClient
  ) { }

  createProject(user: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/project/create.php`, user);
  }

  readProject(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/project/read.php`);
  }

  update(data: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/project/update.php`, data);
  }

  updatePsta(data: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/project/updatePsta.php`, data);
  }

  delete(project_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/project/delete.php`, { params: { project_id: project_id } });
  }

  readOne(project_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/backend/api/project/read_one.php`, { params: { project_id: project_id } });
  }


}
