import { Injectable } from '@angular/core';

import { CartItemModel } from '../models/cart-item.model';
import { LocalStorageService } from 'src/app/shared/services';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private readonly cartItemsStorageKey = 'cartItems';

    constructor(private localStorageService: LocalStorageService) { }

    getLocalCartItems(): ReadonlyArray<CartItemModel> {
        const storedItems = this.localStorageService.getItem<ReadonlyArray<CartItemModel>>(this.cartItemsStorageKey);

        return storedItems || [];
    }

    updateLocalCartItems(items: ReadonlyArray<CartItemModel>): void {
        this.localStorageService.setItem<ReadonlyArray<CartItemModel>>(this.cartItemsStorageKey, items);
    }
}
