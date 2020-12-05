import { Injectable } from '@angular/core';

import { CartItemModel } from '../models/cart-item.model';
import { LocalStorageService } from 'src/app/shared/services';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private readonly cartItemsStorageKey = 'cartItems';

    constructor(private localStorageService: LocalStorageService) { }

    getLocalCartItems(): Array<CartItemModel> {
        const storedItems = this.localStorageService.getItem<Array<CartItemModel>>(this.cartItemsStorageKey);

        return storedItems || [];
    }

    updateLocalCartItems(items: CartItemModel[]): void {
        this.localStorageService.setItem<Array<CartItemModel>>(this.cartItemsStorageKey, items);
    }
}
