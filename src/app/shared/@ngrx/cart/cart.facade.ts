
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { CartItemModel } from 'src/app/cart/models/cart-item.model';
import { ProductModel } from 'src/app/products/models/product.model';

import * as CartSelectors from './cart.selectors';
import * as CartActions from './cart.actions';
import { CartState } from './cart.state';


@Injectable({
    providedIn: 'root'
})
export class CartFacade {

    items$: Observable<Array<CartItemModel>>;
    totalSum$: Observable<number>;
    totalQuantity$: Observable<number>;
    isEmpty$: Observable<boolean>;

    constructor(private store: Store<CartState>) {
        this.items$ = this.store.select(CartSelectors.selectCartItems);
        this.totalSum$ = this.store.select(CartSelectors.selectTotalSum);
        this.totalQuantity$ = this.store.select(CartSelectors.selectTotalQuantity);
        this.isEmpty$ = this.store.select(CartSelectors.selectIsEmpty);
    }

    addProduct(product: ProductModel): void {
        this.store.dispatch(CartActions.addProductToCartItem({ product }));
    }

    decreaseQuantityByOne(cartItem: CartItemModel): void {
        this.store.dispatch(CartActions.decreaseCartItemQuantityByOne({ cartItem }));
    }

    increaseQuantityByOne(cartItem: CartItemModel): void {
        this.store.dispatch(CartActions.increaseCartItemQuantityByOne({ cartItem }));
    }

    removeProduct(product: ProductModel): void {
        this.store.dispatch(CartActions.removeProductFromCart({ product }));
    }

    clear(): void {
        this.store.dispatch(CartActions.removeAllProductsFromCart());
    }
}
