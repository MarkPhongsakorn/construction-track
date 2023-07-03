import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getPrefix() {
    throw new Error('Method not implemented.');
  }
  
  private baseUrl = 'http://localhost/test';

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/backend/api/users/read_one.php`,{ params: { id: id } });
  }

  createUser(user: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/users/create.php`, user);
  }
  

  updateUser(user: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/users/update.php`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/users/delete.php`,{ params: { id: id } });
  }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}//backend/api/users/read.php`);
  }
}
