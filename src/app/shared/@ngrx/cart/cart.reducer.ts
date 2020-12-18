import { Action, createReducer, on } from '@ngrx/store';

import { adapter, CartState, initialCartState } from './cart.state';
import * as CartActions from './cart.actions';
import { CartItemModel } from '../../../cart/models/cart-item.model';

const updateStateProperties = (state: CartState): CartState => {
    const items = Object.values(state.entities);

    const sum = (values: number[]): number =>
        values.reduce((prev, next) => prev + next, 0);

    const totalQuantity = sum(items.map(item => item.quantity, state));

    const totalSum = sum(items.map(item => item.product.price * item.quantity));

    const isEmpty = items.length === 0;

    return { ...state, totalQuantity, totalSum, isEmpty };
};

const reducer = createReducer(initialCartState,
    on(CartActions.setCartItems, (state, { items }) => {
        return adapter.setAll(items, state);
    }),
    on(CartActions.addProductToCartItem, (state, { product }) => {
        const item = state.entities[product.id];

        // первый раз встречаю !!!, раньше встречал ! и !!
        // одного ! не достаточно?
        if (!!!item) {
            return adapter.addOne(new CartItemModel(product, 1), state);
        }

        return adapter.setOne({ ...item, quantity: item.quantity + 1 }, state);
    }),
    on(CartActions.increaseCartItemQuantityByOne, (state, { cartItem }) => {
        const item = state.entities[cartItem.product.id];

        if (!!!item) {
            return { ...state };
        }

        const update = {
            id: item.product.id,
            changes: { quantity: item.quantity + 1 }
        };

        return adapter.updateOne(update, state);
    }),
    on(CartActions.decreaseCartItemQuantityByOne, (state, { cartItem }) => {
        const item = state.entities[cartItem.product.id];

        if (!!!item) {
            return { ...state };
        }

        if (item.quantity === 1) {
            return adapter.removeOne(item.product.id, state);
        }

        const update = {
            id: item.product.id,
            changes: { quantity: item.quantity - 1 }
        };

        return adapter.updateOne(update, state);
    }),
    on(CartActions.removeProductFromCart, (state, { product }) => {
        const item = state.entities[product.id];

        if (!!!item) {
            return { ...state };
        }

        return adapter.removeOne(item.product.id, state);
    }),
    on(CartActions.removeAllProductsFromCart, state => {
        return adapter.removeAll(state);
    })
);

export function cartReducer(state: CartState, action: Action): CartState {
    return updateStateProperties(reducer(state, action));
}
