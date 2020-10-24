import { Injectable } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';
import { CartItemModel } from '../models/cart-item.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cartItems: CartItemModel[] = [];

    getCartItems(): ReadonlyArray<CartItemModel> {
        return this.cartItems;
    }

    addProductToCart(product: ProductModel): void {
        const existingItem = this.searchCartForProductByName(product.name);
        if (existingItem !== undefined) {
            this.increaseQuantityByOne(product);
        } else {
            this.cartItems.push(this.createNewCartItem(product));
        }
    }

    increaseQuantityByOne(product: ProductModel): void {
        const itemToIncrease = this.searchCartForProductByName(product.name);
        if (itemToIncrease !== undefined) {
            itemToIncrease.quantity++;
        }
    }

    decreaseQuantityByOne(product: ProductModel): void {
        const itemToDecrease = this.searchCartForProductByName(product.name);
        if (itemToDecrease !== undefined) {
            itemToDecrease.quantity--;
        }
    }

    removeProductFromCart(product: ProductModel): void {
        const productToRemove = this.searchCartForProductByName(product.name);
        console.log(`before: ${this.cartItems.length}`);
        this.cartItems = this.cartItems.filter(item => item !== productToRemove);
        console.log(`after: ${this.cartItems.length}`);
    }

    private searchCartForProductByName(productName: string): CartItemModel {
        return this.cartItems.find(item => item.product.name === productName);
    }

    private createNewCartItem(product: ProductModel): CartItemModel {
        return {
            product,
            quantity: 1
        };
    }
}
