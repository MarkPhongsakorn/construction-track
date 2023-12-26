import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;


  constructor(private http: HttpClient) { }

  getUser(user_detail_id: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/user_detail/read_one.php`, { params: { user_detail_id: user_detail_id } });
  }

  createUser(user: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/user_detail/create.php`, user);
  }


  updateUser(user: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/backend/api/user_detail/update.php`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/backend/api/user_detail/delete.php`, { params: { id: id } });
  }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/backend/api/user_detail/read.php`);
  }

  checkuser(user: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/user_detail/login.php`, user);
  }

}
