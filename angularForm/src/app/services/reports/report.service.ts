import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = environment.baseUrl;


  constructor(
    private http: HttpClient
  ) { }

  getOneReport(dr_id: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/daily-report/read_one.php`, { params: { dr_id: dr_id } });
  }
  getOneByproject(project_id: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/daily-report/read_oneByproject.php`, { params: { project_id: project_id } });
  }
  getReport(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/daily-report/read.php`);
  }
  getWeek(project_id: string, startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/backend/api/daily-report/read_week.php?project_id=${project_id}&start_date=${startDate}&end_date=${endDate}`);
  }
  getMonth(project_id: string, month: string, year: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/backend/api/daily-report/read_month.php?project_id=${project_id}&month=${month}&year=${year}`);
  }
  create(user: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/daily-report/create.php`, user);
  }
  update(data: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/daily-report/update.php`, data);
  }
  delete(dr_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/daily-report/delete.php`, { params: { dr_id: dr_id } });
  }

  deleteProject(project_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/daily-report/deleteByProject.php`, { params: { project_id: project_id } });
  }
}
