import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Product } from '../models/product-model';



@Injectable({ providedIn: 'root' })
export class ProductService {
   constructor(private http: HttpClient) { }
   getAll() {
      return this.http.get<Product[]>(`/product-list`)
   }
   create(params: any) {
      return this.http.post(`/product-add`, params)
   }
}