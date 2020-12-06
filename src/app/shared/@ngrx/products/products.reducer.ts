import { Action, createReducer, on } from '@ngrx/store';

import * as productsActions from './products.actions';
import { initialProductsState, ProductsState as ProductsState } from './products.state';

const reducer = createReducer(initialProductsState,
    on(productsActions.getProductItemsSuccess, (state, { products }) => {
        return { ...state, items: products };
    }));

export function productsReducer(state: ProductsState, action: Action): ProductsState {
    return reducer(state, action);
}
