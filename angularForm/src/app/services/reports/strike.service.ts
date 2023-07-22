import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StrikeService {
  private baseUrl = 'http://localhost/test';

  constructor(
    private http: HttpClient
  ) { }

  create(data: object) {
    return this.http.post(`${this.baseUrl}/backend/api/strike/create.php`, data)
  }

  delete(dr_id: string) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/strike/delete.php`,{ params: { dr_id: dr_id } });
  }
}
