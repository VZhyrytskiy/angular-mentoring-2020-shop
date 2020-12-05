import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as CartActions from './cart.actions';
import { AppState } from '../app.state';
import { CartService } from 'src/app/cart/services/cart.service';

@Injectable()
export class CartEffects {

    getLocalCartItems$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.getLocalCartItems),
            switchMap(async () => {
                const items = this.cartService.getLocalCartItems();
                return CartActions.setCartItems({ items: items });
            })
        )
    )

    updateLocalCartItems$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.setCartItems),
            switchMap(async (action) => {
                this.cartService.updateLocalCartItems(action.items);
                return CartActions.updateLocalCartItemsSuccess();
            })
        )
    );

    productAddedToCart$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.addProductToCartItem),
            switchMap(async (action) => {
                return CartActions.addProductToCartSuccess({ addedProduct: action.product });
            })
        )
    );

    constructor(private actions$: Actions,
        private cartService: CartService,
        private store: Store<AppState>) {
    }
}