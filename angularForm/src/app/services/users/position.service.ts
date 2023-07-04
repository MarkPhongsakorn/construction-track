import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private baseUrl = 'http://localhost/test';

  constructor(private http: HttpClient) { }

  getPos(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/position/read.php`);
  }
}
