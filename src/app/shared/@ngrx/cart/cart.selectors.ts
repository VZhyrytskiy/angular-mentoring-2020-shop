import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectCartItems = createSelector(selectCartState, (state: CartState) => state.items);
export const selectTotalQuantity = createSelector(selectCartState, (state: CartState) => state.totalQuantity);
export const selectTotalSum = createSelector(selectCartState, (state: CartState) => state.totalSum);
export const selectIsEmpty = createSelector(selectCartState, (state: CartState) => state.isEmpty);