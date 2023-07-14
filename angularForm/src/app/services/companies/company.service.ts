import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = 'http://localhost/test';

  constructor(
    private http: HttpClient
  ) { }

  getComp(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/company/read.php`);
  }
}
