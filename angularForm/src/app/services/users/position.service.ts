import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private baseUrl = 'http://localhost/construction-track';

  constructor(private http: HttpClient) { }

  getPos(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/position/read.php`);
  }

  getOne(pos_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/backend/api/position/read.php`, { params: { pos_id: pos_id } });
  }

}
