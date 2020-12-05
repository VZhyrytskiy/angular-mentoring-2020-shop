import { Action, createReducer, on } from '@ngrx/store';

import { CartState, initialCartState } from './cart.state';
import * as CartActions from './cart.actions';
import { CartItemModel } from 'src/app/cart/models/cart-item.model';

const createStateFrom = function (items: ReadonlyArray<CartItemModel>): CartState {
    const totalQuantity = items.map(item => item.quantity)
        .reduce((prev, next) => prev + next, 0);

    const totalSum = items.map(item => item.product.price * item.quantity)
        .reduce((prev, next) => prev + next, 0);

    const isEmpty = items.length === 0;

    return { items, totalQuantity, totalSum, isEmpty }
}

const increaseQuantityByOne = function (productIndex: number,
    items: ReadonlyArray<CartItemModel>): ReadonlyArray<CartItemModel> {
    const item = items[productIndex];
    const updatedItem = new CartItemModel(item.product, item.quantity + 1);

    return [...items.slice(0, productIndex), updatedItem, ...items.slice(productIndex + 1)];
}

const reducer = createReducer(
    initialCartState,
    on(CartActions.setCartItems, (_state,{ items }) => {
        console.log(items);
        const newState = createStateFrom(items);
        console.log(newState);
        return newState;
    }),
    on(CartActions.addProductToCartItem, ({ items }, { product }) => {
        const productIndex = items.findIndex(x => x.product.id === product.id);

        if (productIndex === -1) {
            return createStateFrom([...items, new CartItemModel(product, 1)]);
        }

        return createStateFrom(increaseQuantityByOne(productIndex, items));
    }),
    on(CartActions.increaseCartItemQuantityByOne, (state, { cartItem }) => {
        const productIndex = state.items.findIndex(item => item.product.id === cartItem.product.id);

        if (productIndex === -1) {
            return { ...state }
        }

        return createStateFrom(increaseQuantityByOne(productIndex, state.items));
    }),
    on(CartActions.decreaseCartItemQuantityByOne, (state, { cartItem }) => {
        const items = state.items;

        const productIndex = items.findIndex(item => item.product.id === cartItem.product.id);

        if (productIndex === -1) {
            return { ...state }
        }

        const item = items[productIndex];

        if (item.quantity === 1) {
            return createStateFrom([...items.slice(0, productIndex), ...items.slice(productIndex + 1)]);
        }

        const updatedItem = new CartItemModel(item.product, item.quantity - 1);
        const updatedItems = [...items.slice(0, productIndex), updatedItem, ...items.slice(productIndex + 1)];

        return createStateFrom(updatedItems);
    }),
    on(CartActions.removeProductFromCart, (state, { product }) => {
        const productIndex = state.items.findIndex(item => item.product.id === product.id);

        if (productIndex === -1) {
            return { ...state };
        }

        const updatedItems = [...state.items.slice(0, productIndex), ...state.items.slice(productIndex + 1)];

        return createStateFrom(updatedItems);
    }),
    on(CartActions.removeAllProductsFromCart, () => createStateFrom([]))
);

export function cartReducer(state: CartState, action: Action): CartState {
    return reducer(state, action);
}
