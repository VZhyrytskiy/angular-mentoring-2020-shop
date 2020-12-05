import { Action, createReducer, on } from '@ngrx/store';

import { CartState, initialCartState } from './cart.state';
import * as CartActions from './cart.actions';
import { CartItemModel } from 'src/app/cart/models/cart-item.model';
import { ProductModel } from 'src/app/products/models/product.model';

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
    const updatedItem = { ...item, quantity: item.quantity + 1 };

    return [...items.slice(0, productIndex), updatedItem, ...items.slice(productIndex + 1)];
}

const toCartItem = function (product: ProductModel): CartItemModel {
    return {
        product,
        quantity: 1
    };
}

const reducer = createReducer(
    initialCartState,
    on(CartActions.setCartItems, state => createStateFrom(state.items)),
    on(CartActions.addProductToCartItem, ({ items }, { product }) => {
        const productIndex = items.findIndex(x => x.product.id === product.id);

        if (productIndex === -1) {
            return createStateFrom([...items, toCartItem(product)]);
        }

        return createStateFrom(increaseQuantityByOne(productIndex, items));
    })
);

export function cartReducer(state: CartState, action: Action): CartState {
    return reducer(state, action);
}
