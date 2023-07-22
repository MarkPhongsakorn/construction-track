import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StaWeatherService {
  private baseUrl = 'http://localhost/test';

  constructor(
    private http: HttpClient
  ) { }

  read() : Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/backend/api/sta_weather/read.php`);
  }
}
