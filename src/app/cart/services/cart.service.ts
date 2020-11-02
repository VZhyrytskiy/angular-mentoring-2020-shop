import { Injectable } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';
import { CartItemModel } from '../models/cart-item.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private _cartItems: CartItemModel[] = [];
    private _totalQuantity: number = 0;
    private _totalSum: number = 0;

    get totalQuantity(): number {
        return this._totalQuantity;
    }

    get isEmpty(): boolean {
        return this._totalQuantity === 0;
    }

    get totalSum(): number {
        return this._totalSum;
    }

    getCartItems(): ReadonlyArray<CartItemModel> {
        return this._cartItems;
    }

    getCartItemTotalPrice(cartItem: CartItemModel): number {
        return cartItem.product.price * cartItem.quantity;
    }

    addProductToCart(product: ProductModel): void {
        const existingItem = this.searchCartForProductByName(product.name);
        if (existingItem !== undefined) {
            this.increaseQuantityByOne(product);
        } else {
            this._cartItems.push(this.createNewCartItem(product));
            this.updateCart();
        }
    }

    increaseQuantityByOne(product: ProductModel): void {
        const itemToIncrease = this.searchCartForProductByName(product.name);
        if (itemToIncrease === undefined) {
            return;
        }

        itemToIncrease.quantity++;
        this.updateCart();
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

        this.updateCart();
    }

    removeProductFromCart(product: ProductModel): void {
        const productToRemove = this.searchCartForProductByName(product.name);
        this._cartItems = this._cartItems.filter(item => item !== productToRemove);
        this.updateCart();
    }

    removeAllProducts(): void {
        this._cartItems = [];
        this.updateCart();
    }

    updateCart(): void {
        this.updateTotalSum();
        this.updateTotalQuantity();
    }

    private updateTotalSum(): void {
        this._totalSum = this._cartItems.map(this.getCartItemTotalPrice)
            .reduce((prev, next) => prev + next, 0);
    }

    private updateTotalQuantity(): void {
        this._totalQuantity = this._cartItems
            .map((item) => { return item.quantity })
            .reduce((prev, next) => prev + next, 0);
    }

    private searchCartForProductByName(productName: string): CartItemModel {
        return this._cartItems.find(item => item.product.name === productName);
    }

    private createNewCartItem(product: ProductModel): CartItemModel {
        return {
            product,
            quantity: 1
        };
    }
}
