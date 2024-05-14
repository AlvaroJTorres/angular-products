import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api'

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
      AUTH_API + '/sign-in',
      {
        username,
        password
      },
      httpOptions
    )
  }

  register(name: string, username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/sign-up',
      {
        name,
        username,
        email,
        password
      },
      httpOptions
    )
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + '/sign-out', { }, httpOptions)
  }
}
