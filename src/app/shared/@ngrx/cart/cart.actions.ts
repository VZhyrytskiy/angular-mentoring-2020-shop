import { createAction, props } from '@ngrx/store';

import { CartItemModel } from 'src/app/cart/models/cart-item.model';

export const getCartItems = createAction(
    '[Cart] GET_CART_ITEMS'
);

export const initializeCartItems = createAction(
    '[Cart] INITIALIZE_CART_ITEMS'
)

export const setCartItems = createAction(
    '[Cart] SET_CART_ITEMS',
     props<{ items: CartItemModel[] }>()
)

export const getCartItemsSuccess = createAction(
    '[Get Cart Items Effect] GET_CART_ITEMS_SUCCESS', 
    props<{ items: CartItemModel[] }>()
)
