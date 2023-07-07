import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost/test';

  constructor(
    private http: HttpClient
  ) { }

  createProject(user: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/backend/api/project/create.php`, user);
  }

}
