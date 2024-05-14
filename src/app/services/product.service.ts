import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const baseUrl = 'http://localhost:8080/api/products'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE1NjM4MDI1LCJleHAiOjE3MTYyNDI4MjV9.SAEhJg4Hai778nJxEwpYvlD2AUGk23GMbgRL3tXV3CQ'
  t = window.sessionStorage.getItem('auth-user')

  headersObject = {'Authorization': "Bearer "+ this.t}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl, {headers: this.headersObject});
  }

  get(id: any): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/${id}`, {headers: this.headersObject});
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data, {headers: this.headersObject});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, data, {headers: this.headersObject});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, {headers: this.headersObject});
  }
}
