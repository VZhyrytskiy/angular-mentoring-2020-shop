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
        this.cartItems.subscribe(updatedItems => this.updateLocal(updatedItems));

        this.publish(this.loadCartItems());
    }

    loadCartItems(): Array<CartItemModel> {
        const storedItems = this.storage.getItem<Array<CartItemModel>>(this.cartItemsStorageKey);
        
        return storedItems || [];
    }

    totalQuantity(): Observable<number> {
        return this.cartItems.pipe(
            map(items => items
                .map(item => item.quantity)
                .reduce((prev, next) => prev + next, 0)
            )
        );
    }

    isEmpty(): Observable<boolean> {
        return this.totalQuantity().pipe(map(quantity => quantity === 0));
    }

    totalSum(): Observable<number> {
        return this.cartItems.pipe(
            map(items => items.map(this.getItemTotalPrice)
                .reduce((prev, next) => prev + next, 0)
            )
        );
    }

    getItems(): Observable<Array<CartItemModel>> {
        return this.cartItems.asObservable();
    }

    getItemTotalPrice(cartItem: CartItemModel): number {
        return cartItem.product.price * cartItem.quantity;
    }

    addProduct(product: ProductModel): Promise<ProductModel> {
        const items = this.cartItems.getValue();

        const productIndex = items.findIndex(x => x.product.id === product.id);

        if (productIndex === -1) {
            this.publish([...items, this.toCartItem(product)]);
        } else {
            this.increaseQuantityByOne(product);
        }

        return Promise.resolve(product);
    }

    increaseQuantityByOne(product: ProductModel): void {
        const items = this.cartItems.getValue();

        const productIndex = items.findIndex(x => x.product.id === product.id);

        if (productIndex === -1) {
            return;
        }

        const item = items[productIndex];
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        const updatedItems = [...items.slice(0, productIndex), updatedItem, ...items.slice(productIndex+1)];

        this.publish(updatedItems);
    }

    decreaseQuantityByOne(product: ProductModel): void {
        const items = this.cartItems.getValue();

        const productIndex = items.findIndex(x => x.product.id === product.id);

        if (productIndex === -1) {
            return;
        }

        const updatedItem = { ...items[productIndex], quantity: items[productIndex].quantity - 1 };
        const updated = [...items.slice(0, productIndex), updatedItem, ...items.slice(productIndex + 1)];

        this.publish(updated.filter(x => x.quantity > 0));
    }

    removeProduct(product: ProductModel): void {
        const items = this.cartItems.getValue();

        const productIndex = items.findIndex(x => x.product.id === product.id);

        this.publish([...items.slice(0, productIndex), ...items.slice(productIndex + 1)]);
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
