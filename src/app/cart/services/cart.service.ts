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

    getCartItemTotalPrice(cartItem: CartItemModel): number {
        return cartItem.product.price * cartItem.quantity;
    }

    getCartTotalPrice(): number {
        return this.cartItems.map(this.getCartItemTotalPrice)
            .reduce((prev, next) => prev + next, 0)
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
        if (itemToDecrease === undefined) {
            return;
        }

        if (itemToDecrease.quantity === 1) {
            this.removeProductFromCart(product);
        } else {
            itemToDecrease.quantity--;
        }
    }

    removeProductFromCart(product: ProductModel): void {
        const productToRemove = this.searchCartForProductByName(product.name);
        this.cartItems = this.cartItems.filter(item => item !== productToRemove); 
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
