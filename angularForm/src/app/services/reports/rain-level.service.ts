import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RainLevelService {

  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  read(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/rain_level/read.php`);
  }
}
