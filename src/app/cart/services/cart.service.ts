import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductModel } from 'src/app/products/models/product.model';
import { CartItemModel } from '../models/cart-item.model';
import { LocalStorageService } from 'src/app/shared/services';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private readonly cartItemsStorageKey = 'cartItems';
    private cartItems: BehaviorSubject<Array<CartItemModel>>;

    constructor(private readonly storage: LocalStorageService) {
        this.cartItems = new BehaviorSubject<Array<CartItemModel>>([]);
        const storedItems = storage.getItem<Array<CartItemModel>>(this.cartItemsStorageKey);
        this.cartItems.next(storedItems || []);
        this.cartItems.subscribe(updatedItems => this.updateLocalCart(updatedItems));
    }

    totalQuantity(): Observable<number> {
        return this.cartItems.pipe(map(items => {
            return items.map((item) => item.quantity)
                .reduce((prev, next) => prev + next, 0);
        }));
    }

    isEmpty(): Observable<boolean> {
        return this.totalQuantity().pipe(map(x => x === 0));
    }

    totalSum(): Observable<number> {
        return this.cartItems.pipe(map(items => {
            return items.map(this.getCartItemTotalPrice)
                .reduce((prev, next) => prev + next, 0);
        }));
    }

    getCartItems(): Observable<Array<CartItemModel>> {
        return this.cartItems.asObservable();
    }

    getCartItemTotalPrice(cartItem: CartItemModel): number {
        return cartItem.product.price * cartItem.quantity;
    }

    addProductToCart(product: ProductModel): void {
        const existingItem = this.searchCartForProductByName(product.name);
        if (existingItem !== undefined) {
            this.increaseQuantityByOne(product);
        } else {
            const items = this.cartItems.getValue();
            items.push(this.createNewCartItem(product));
            this.cartItems.next(items);
        }
    }

    increaseQuantityByOne(product: ProductModel): void {
        const itemToIncrease = this.searchCartForProductByName(product.name);
        if (itemToIncrease === undefined) {
            return;
        }

        itemToIncrease.quantity++;
        this.cartItems.next(this.cartItems.getValue());
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

        this.cartItems.next(this.cartItems.getValue());
    }

    removeProductFromCart(product: ProductModel): void {
        const productToRemove = this.searchCartForProductByName(product.name);
        const filteredItems = this.cartItems.getValue().filter(item => item !== productToRemove);
        this.cartItems.next(filteredItems);
    }

    removeAllProducts(): void {
        this.cartItems.next([]);
    }

    updateLocalCart(items: CartItemModel[]): void {
        this.storage.setItem<Array<CartItemModel>>(this.cartItemsStorageKey, items);
    }

    private searchCartForProductByName(productName: string): CartItemModel {
        return this.cartItems.getValue().find(item => item.product.name === productName);
    }

    private createNewCartItem(product: ProductModel): CartItemModel {
        return {
            product,
            quantity: 1
        };
    }
}
