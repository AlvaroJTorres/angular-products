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

  t = ''

  headersObject = {'Authorization': "Bearer "+ this.t}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl, {headers: this.headersObject});
  }

  get(id: any): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
