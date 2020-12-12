import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouterState } from '../router/router.selectors';
import { ProductsState } from './products.state';

export const selectProductsState = createFeatureSelector<ProductsState>('products');
export const selectProductItems = createSelector(selectProductsState, (state: ProductsState) => state.items);
export const selectProductsLoaded = createSelector(selectProductsState, (state: ProductsState) => state.loaded);

export const selectProductByUrl = createSelector(
    selectProductItems,
    selectRouterState,
    (products, router) => {
        const id = router.state.params.id;
        return products.find(product => product.id === id);
    });
