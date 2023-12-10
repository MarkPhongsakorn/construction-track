import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaborNameService {

  private baseUrl = 'http://localhost/test';

  constructor(
    private http: HttpClient
  ) { }

  create(data: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/labor_name/create.php`, data);
  }

  read(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/labor_name/read.php`);
  }

  update(data: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/labor_name/update.php`, data);
  }

  delete(labor_name_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/labor_name/delete.php`, { params: { labor_name_id: labor_name_id } });
  }

  readOne(labor_name_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/backend/api/labor_name/read_one.php`, { params: { labor_name_id: labor_name_id } });
  }


}
