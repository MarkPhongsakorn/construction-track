import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private baseUrl = 'http://localhost/test';

  constructor(
    private http: HttpClient
  ) { }

  read() : Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/unit/read.php`);
  }
}
