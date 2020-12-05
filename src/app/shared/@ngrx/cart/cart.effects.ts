import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import * as CartActions from './cart.actions';
import { AppState } from '../app.state';
import { CartService } from 'src/app/cart/services/cart.service';
import { selectCartItems } from './cart.selectors';

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
            ofType(
                CartActions.removeAllProductsFromCart,
                CartActions.increaseCartItemQuantityByOne,
                CartActions.decreaseCartItemQuantityByOne,
                CartActions.addProductToCartSuccess,
                CartActions.removeProductFromCart),
            concatMap(action => of(action).pipe(
                withLatestFrom(this.store.select(selectCartItems))
            )),
            tap(([, items]) => this.cartService.updateLocalCartItems(items)),
            switchMap(async () => {
                return CartActions.updateLocalCartItemsSuccess();
            })
        )
    );

    productAddedToCart$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.addProductToCartItem),
            map(action => {
                return CartActions.addProductToCartSuccess({ addedProduct: action.product });
            })
        )
    );

    constructor(private actions$: Actions,
        private cartService: CartService,
        private store: Store<AppState>) {
    }
}