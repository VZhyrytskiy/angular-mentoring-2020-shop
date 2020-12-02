import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import * as CartActions from './cart.actions';
import { AppState } from '../app.state';
import { CartService } from 'src/app/cart/services/cart.service';

@Injectable()
export class CartEffects {

    getCartItems$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.getCartItems),
            switchMap(async () => CartActions.getCartItemsSuccess({ items: [] })
            )
        )
    );

    loadCartItems$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.initializeCartItems),
            switchMap(async () =>
                CartActions.setCartItems({ items: this.cartService.loadCartItems() })
            )
        )
    )

    constructor(private actions$: Actions,
        private cartService: CartService,
        private store: Store<AppState>) {
        console.log('[CART EFFECTS]');
    }
}