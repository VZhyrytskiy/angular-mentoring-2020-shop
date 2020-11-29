import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductModel } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(private readonly http: HttpClient) { }

    private readonly baseUrl = 'http://localhost:3000';

    getProducts(): Observable<ProductModel[]> {
        const url = `${this.baseUrl}/products`;

        return this.http.get<ProductModel[]>(url);
    }

    getProductById(id: string): Promise<ProductModel> {
        const url = `${this.baseUrl}/products/${id}`;

        return this.http.get<ProductModel>(url)
            .toPromise<ProductModel>();
    }
}
