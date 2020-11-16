import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ProductsService } from './services/products.service';
import { ProductModel } from './models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductModel> {

    constructor(private productsService: ProductsService) { }

    resolve(route: ActivatedRouteSnapshot): ProductModel {
        const id = route.paramMap.get('id');
        
        return this.productsService.getProductById(id);
    }
}
