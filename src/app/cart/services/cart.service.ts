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
        const itemIndex = this.cartItems.findIndex(cartItem => cartItem.name == product.name);
        const cartHasProduct = itemIndex > -1;     
        if (cartHasProduct) {
            const existingItem = this.cartItems[itemIndex];
            existingItem.quantity++;
        } else {
            this.cartItems.push(this.toCartItem(product));
        }
    }

    private toCartItem(product: ProductModel): CartItemModel {
        return {
            imageUrl: product.imageUrl,
            name: product.name,
            quantity: 1
        }
    }
}
