import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ServerService {

  private userUrl = 'http://127.0.0.1:5000';  // URL to REST API

  constructor(private http: HttpClient) { }

  /** POST LOGIN */
  login(data: any): Observable<any> {
    const url = `${this.userUrl}/api/login`;
    return this.http.post(url, data, httpOptions);
  }

  /** POST GOOGLE LOGIN */
  login_google(code: any): Observable<any> {
    const url = `${this.userUrl}/api/login_google`;
    return this.http.post(url, code, httpOptions);
  }

   /** POST REGISTER */
   register(data: any): Observable<any> {
    const url = `${this.userUrl}/api/register`;
    return this.http.post(url, data, httpOptions);
  }
  
}