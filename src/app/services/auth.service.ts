import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = process.env['API_URL'] || 'http://localhost:8080'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username:string, password: string): Observable<any> {
    return this.http.post(
      API_URL + '/api/sign-in',
      {
        username,
        password
      },
      httpOptions
    )
  }

  register(name: string, username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      API_URL + '/api/sign-up',
      {
        name,
        username,
        email,
        password
      },
      httpOptions
    )
  }

  changePassword(username: string, new_password: string, confirmed_password: string): Observable<any> {
    return this.http.patch(
      API_URL + '/api/change-password',
      {
        username,
        new_password,
        confirmed_password
      },
      httpOptions
    )
  }

  logout(): Observable<any> {
    return this.http.post(API_URL + '/api/sign-out', { }, httpOptions)
  }
}
