import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrefixService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPrefix(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/prefix/read.php`);
  }


  createUser(user: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/prefix/create.php`, user);
  }


  updateUser(user: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/prefix/update.php`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/prefix/delete.php`, { params: { id: id } });
  }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}//backend/api/prefix/read.php`);
  }

}
