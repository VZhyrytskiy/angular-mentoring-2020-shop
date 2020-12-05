import { createAction, props } from '@ngrx/store';

import { CartItemModel } from 'src/app/cart/models/cart-item.model';
import { ProductModel } from 'src/app/products/models/product.model';

export const getLocalCartItems = createAction(
    '[Cart] GET_LOCAL_CART_ITEMS'
)

export const setCartItems = createAction(
    '[Cart] SET_CART_ITEMS',
    props<{ items: ReadonlyArray<CartItemModel> }>()
)

export const updateLocalCartItems = createAction(
    '[Set Cart Items Effect] UPDATE_LOCAL_CART_ITEMS',
    props<{ items: ReadonlyArray<CartItemModel> }>()
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
    '[Add Product To Cart Effect] ADD_PRODUCT_TO_CART',
    props<{ product: ProductModel }>()
)

export const addProductToCartSuccess = createAction(
    '[Cart] ADD_PRODUCT_TO_CART_SUCCESS',
    props<{ addedProduct: ProductModel }>()
)

export const increaseCartItemQuantityByOne = createAction(
    '[Cart] INCREASE_CART_PRODUCT_QUANTITY_BY_ONE',
    props<{ cartItem: CartItemModel }>()
)

export const decreaseCartItemQuantityByOne = createAction(
    '[Cart] DECREASE_CART_PRODUCT_QUANTITY_BY_ONE',
    props<{ cartItem: CartItemModel }>()
)

export const removeProductFromCart = createAction(
    '[Cart] REMOVE_PRODUCT_FROM_CART',
    props<{ product: ProductModel }>()
)

export const removeAllProductsFromCart = createAction(
    '[Cart] REMOVE_ALL_PRODUCTS_FROM_CART'
)