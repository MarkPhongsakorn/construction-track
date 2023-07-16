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

  getReport(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/daily-report/read.php`);
  }
}
