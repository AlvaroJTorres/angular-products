import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  t = window.sessionStorage.getItem('auth-user')

  headersObject = { 'Authorization': "Bearer " + this.t }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${process.env['API_URL']}/products`, {headers: this.headersObject});
  }

  get(id: any): Observable<Product> {
    return this.http.get<Product>(`${process.env['API_URL']}/products/${id}`, {headers: this.headersObject});
  }

  create(data: any): Observable<any> {
    return this.http.post(`${process.env['API_URL']}/products`, data, {headers: this.headersObject});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${process.env['API_URL']}/products/${id}`, data, {headers: this.headersObject});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${process.env['API_URL']}/products/${id}`, {headers: this.headersObject});
  }
}
