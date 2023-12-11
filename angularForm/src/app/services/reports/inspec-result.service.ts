import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InspecResultService {
  private baseUrl = 'http://localhost/construction-track';

  constructor(
    private http: HttpClient
  ) { }

  read(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/inspec_result/read.php`);
  }
}