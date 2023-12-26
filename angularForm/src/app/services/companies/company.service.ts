import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = environment.baseUrl;


  constructor(
    private http: HttpClient
  ) { }

  getComp(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/company/read.php`);
  }

  getOneComp(comp_id: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/company/read_one.php`, { params: { comp_id: comp_id } });
  }

  create(data: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/company/create.php`, data);
  }

  update(data: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/company/update.php`, data);
  }


  delete(comp_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/company/delete.php/`, { params: { comp_id: comp_id } });
  }
}
