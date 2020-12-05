import { Action, createReducer, on } from '@ngrx/store';

import { CartState, initialCartState } from './cart.state';
import * as CartActions from './cart.actions';

const reducer = createReducer(
    initialCartState,
    on(CartActions.getCartItems, state => {
        console.log('GET_CART_ITEMS action being handled!');

        return { ...state };
    }),
    on(CartActions.initializeCartItems, state => {
        console.log('INITIALIZE_CART_ITEMS action being handled!');

        return { ...state };
    }),
    on(CartActions.setCartItems, ({ items }) => {
        console.log('SET_CART_ITEMS action being handled!');

        const totalQuantity = items.map(item => item.quantity)
            .reduce((prev, next) => prev + next, 0);

        const totalSum = items.map(item => item.product.price * item.quantity)
            .reduce((prev, next) => prev + next, 0);

        const isEmpty = items.length === 0;

        return { items, totalQuantity, totalSum, isEmpty };
    })
);

export function cartReducer(state: CartState, action: Action): CartState {
    return reducer(state, action);
}
