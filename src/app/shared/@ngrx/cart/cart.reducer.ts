import { Action, createReducer, on } from '@ngrx/store';

import { CartState, initialCartState } from './cart.state';
import * as CartActions from './cart.actions';

const reducer = createReducer(
    initialCartState,
    on(CartActions.getCartItems, state => {
        console.log('GET_CART_ITEMS action being handled!');
        return { ...state };
    })
);

export function cartReducer(state: CartState, action: Action) {
    return reducer(state, action);
}