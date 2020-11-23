import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
        this.cartItems.pipe(tap(updatedItems => this.updateLocal(updatedItems)));

        const storedItems = storage.getItem<Array<CartItemModel>>(this.cartItemsStorageKey);
        this.publish(storedItems || []);
    }

    totalQuantity(): Observable<number> {
        return this.cartItems.pipe(
            map(items => items
                .map(item => item.quantity)
                .reduce((prev, next) => prev + next)
            )
        );
    }

    isEmpty(): Observable<boolean> {
        return this.totalQuantity().pipe(map(quantity => quantity === 0));
    }

    totalSum(): Observable<number> {
        return this.cartItems.pipe(
            map(items => items.map(this.getItemTotalPrice)
                .reduce((prev, next) => prev + next)
            )
        );
    }

    getItems(): Observable<Array<CartItemModel>> {
        return this.cartItems.asObservable();
    }

    getItemTotalPrice(cartItem: CartItemModel): number {
        return cartItem.product.price * cartItem.quantity;
    }

    addProduct(product: ProductModel): Observable<ProductModel> {
        const items = this.cartItems.getValue();

        const productIndex = items.findIndex(x => x.product.id === product.id);

        if (productIndex === -1) {
            this.publish([...items, this.toCartItem(product)]);
        } else {
            this.increaseQuantityByOne(product);
        }

        return of(product);
    }

    increaseQuantityByOne(product: ProductModel): void {
        const items = this.cartItems.getValue();

        const productIndex = items.findIndex(x => x.product.id === product.id);

        if (productIndex === -1) {
            return;
        }

        const item = items[productIndex];
        const updatedItem = { ...item, quantity: item.quantity++ };
        const updatedItems = [...items.slice(0, productIndex), updatedItem, ...items.slice(productIndex)];

        this.publish(updatedItems);
    }

    decreaseQuantityByOne(product: ProductModel): void {
        const items = this.cartItems.getValue();

        const productIndex = items.findIndex(x => x.product.id === product.id);

        if (productIndex === -1) {
            return;
        }

        const updatedItem = { ...items[productIndex], quantity: items[productIndex].quantity-- };
        const updated = [...items.slice(0, productIndex), updatedItem, ...items.slice(productIndex)];

        this.publish(updated.filter(x => x.quantity > 0));
    }

    removeProduct(product: ProductModel): void {
        const items = this.cartItems.getValue();

        const productIndex = items.findIndex(x => x.product.id === product.id);

        this.publish([...items.slice(0, productIndex), ...items.slice(productIndex)]);
    }

    removeAllProducts(): void {
        this.publish([]);
    }

    private updateLocal(items: CartItemModel[]): void {
        this.storage.setItem<Array<CartItemModel>>(this.cartItemsStorageKey, items);
    }

    private publish(value: Array<CartItemModel>): void {
        this.cartItems.next(value);
    }

    private toCartItem(product: ProductModel): CartItemModel {
        return {
            product,
            quantity: 1
        };
    }
}
