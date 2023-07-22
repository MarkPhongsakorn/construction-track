import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  private baseUrl = 'http://localhost/test';

  constructor(
    private http: HttpClient
  ) { }

  create(data: object) : Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/inspection/create.php`, data);
  }
}