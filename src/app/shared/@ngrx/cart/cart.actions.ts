import { createAction, props } from '@ngrx/store';

import { CartItemModel } from 'src/app/cart/models/cart-item.model';
import { ProductModel } from 'src/app/products/models/product.model';

export const getLocalCartItems = createAction(
    '[Cart] GET_LOCAL_CART_ITEMS'
)

export const setCartItems = createAction(
    '[Cart] SET_CART_ITEMS',
    props<{ items: CartItemModel[] }>()
)

export const updateLocalCartItems = createAction(
    '[Set Cart Items Effect] UPDATE_LOCAL_CART_ITEMS',
    props<{ items: CartItemModel[] }>()
)

export const updateLocalCartItemsSuccess = createAction(
    '[Set Cart Items Effect] UPDATE_LOCAL_CART_ITEMS_SUCCESS'
)

export const getCartItems = createAction(
    '[Cart] GET_CART_ITEMS'
);

export const getCartItemsSuccess = createAction(
    '[Get Cart Items Effect] GET_CART_ITEMS_SUCCESS',
    props<{ items: CartItemModel[] }>()
)

export const addProductToCartItem = createAction(
    '[Cart] ADD_PRODUCT_TO_CART',
    props<{ product: ProductModel }>()
)
export const addProductToCartSuccess = createAction(
    '[Cart] ADD_PRODUCT_TO_CART_SUCCESS',
    props<{ addedProduct: ProductModel }>()
)