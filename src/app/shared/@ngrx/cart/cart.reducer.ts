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

function toCartItem(product: ProductModel): CartItemModel {
    return {
        product,
        quantity: 1
    };
}

const reducer = createReducer(
    initialCartState,
    on(CartActions.getCartItems, state => {
        return { ...state };
    }),
    on(CartActions.getLocalCartItems, state => {
        return { ...state };
    }),
    on(CartActions.setCartItems, ({ items }) =>  createStateFrom(items)),
    on(CartActions.addProductToCartItem, (state, { product }) => {
        let items = state.items;

        const productIndex = items.findIndex(x => x.product.id === product.id);

        if (productIndex === -1) {
          items = [...items, toCartItem(product)];
        } else {
            //this.increaseQuantityByOne(product);
        }

        return createStateFrom(items);
    })
);

export function cartReducer(state: CartState, action: Action): CartState {
    return reducer(state, action);
}
