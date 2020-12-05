import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';

export const selectProductsState = createFeatureSelector<ProductsState>('products');
export const selectProductItems = createSelector(selectProductsState, (state: ProductsState) => state.items);
