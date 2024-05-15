import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const API_URL = process.env['API_URL'] || 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  t = window.sessionStorage.getItem('auth-user')

  headersObject = { 'Authorization': "Bearer " + this.t }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/api/products`, {headers: this.headersObject});
  }

  get(id: any): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/api/products/${id}`, {headers: this.headersObject});
  }

  create(data: any): Observable<any> {
    return this.http.post(`${API_URL}/api/products`, data, {headers: this.headersObject});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${API_URL}/api/products/${id}`, data, {headers: this.headersObject});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/api/products/${id}`, {headers: this.headersObject});
  }
}
