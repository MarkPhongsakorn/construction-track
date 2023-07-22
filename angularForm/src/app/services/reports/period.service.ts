import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private baseUrl = 'http://localhost/test';

  constructor(
    private http: HttpClient
  ) { }

  read() : Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/period/read.php`);
  }

  readOne(period_id: string) : Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/period/read_one.php`,{ params: { period_id: period_id } })
  }
}
