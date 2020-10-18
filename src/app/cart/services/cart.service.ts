import { Injectable } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';
import { CartItemModel } from '../models/cart-item.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cartItems: CartItemModel[] = [];

    getCartItems(): CartItemModel[] {
        return this.cartItems;
    }

    addProductToCart(product: ProductModel): void {
        this.cartItems.push(this.toCartItem(product));
    }

    private toCartItem(source: ProductModel): CartItemModel {
        return {
            name: source?.name,
            imageUrl: source?.imageUrl
        };
    }
}
