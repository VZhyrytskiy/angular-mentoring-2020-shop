import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(private http: HttpClient) { }

    private readonly baseUrl = `${environment.apiBaseUrl}/products`;

    getProducts(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.baseUrl);
    }

    getProductById(id: string): Promise<ProductModel> {
        const url = `${this.baseUrl}/${id}`;

        return this.http.get<ProductModel>(url)
            .toPromise<ProductModel>();
    }
}
