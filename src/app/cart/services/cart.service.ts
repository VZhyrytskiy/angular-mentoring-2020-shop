import { Injectable } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';
import { CartItemModel } from '../models/cart-item.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private readonly productsService: ProductsService) { }

    getCartItems(): CartItemModel[] {
        return this.productsService
            .getProducts()
            .map(this.toCartItem);
    }

    private toCartItem(source: ProductModel): CartItemModel {
        return {
            name: source?.name,
            imageUrl: source?.imageUrl
        };
    }
}
