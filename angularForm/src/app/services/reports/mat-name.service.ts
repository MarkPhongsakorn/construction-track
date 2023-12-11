import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatNameService {

  private baseUrl = 'http://localhost/construction-track';

  constructor(
    private http: HttpClient
  ) { }

  create(data: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/mat_name/create.php`, data);
  }

  read(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/mat_name/read.php`);
  }

  update(data: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/mat_name/update.php`, data);
  }

  delete(mat_name_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/mat_name/delete.php`, { params: { mat_name_id: mat_name_id } });
  }

  readOne(mat_name_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/backend/api/mat_name/read_one.php`, { params: { mat_name_id: mat_name_id } });
  }


}