import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://localhost/test';

  constructor(
    private http: HttpClient
  ) { }

  getOneReport(dr_id: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/daily-report/read_one.php`,{ params: { dr_id: dr_id } });
  }
  getOneByproject(project_id: string) : Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/daily-report/read_oneByproject.php`,{ params: { project_id: project_id}});
  }
  getReport() : Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/daily-report/read.php`);
  }
  create(user: Object) : Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/daily-report/create.php`, user);
  }
  update(data: Object) : Observable<any> {
    return this.http.put(`${this.baseUrl}/backend/api/daily-report/create.php`, data);
  }
}
