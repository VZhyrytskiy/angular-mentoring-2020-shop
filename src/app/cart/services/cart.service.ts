import { Injectable } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';
import { CartItemModel } from '../models/cart-item.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private readonly cartItemsStorageKey = 'cartItems';
    private cartItems: CartItemModel[] = [];

    constructor(private readonly storage: LocalStorageService) {
        this.cartItems = storage.getItem<Array<CartItemModel>>(this.cartItemsStorageKey) || [];
    }

    get totalQuantity(): number {
        return this.cartItems
            .map((item) => item.quantity)
            .reduce((prev, next) => prev + next, 0);
    }

    get isEmpty(): boolean {
        return this.totalQuantity === 0;
    }

    get totalSum(): number {
        return this.cartItems.map(this.getCartItemTotalPrice)
            .reduce((prev, next) => prev + next, 0);
    }

    getCartItems(): ReadonlyArray<CartItemModel> {
        return this.cartItems;
    }

    getCartItemTotalPrice(cartItem: CartItemModel): number {
        return cartItem.product.price * cartItem.quantity;
    }

    addProductToCart(product: ProductModel): void {
        const existingItem = this.searchCartForProductByName(product.name);
        if (existingItem !== undefined) {
            this.increaseQuantityByOne(product);
        } else {
            this.cartItems.push(this.createNewCartItem(product));
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
        this.cartItems = this.cartItems.filter(item => item !== productToRemove);
        this.updateCart();
    }

    removeAllProducts(): void {
        this.cartItems = [];
        this.updateCart();
    }

    updateCart(): void {
        this.storage.setItem<Array<CartItemModel>>(this.cartItemsStorageKey, this.cartItems);
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
