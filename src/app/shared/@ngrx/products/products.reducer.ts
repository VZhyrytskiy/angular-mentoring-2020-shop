import { Action, createReducer } from '@ngrx/store';

import { initialProductsState, ProductsState as ProductsState } from './products.state';

const reducer = createReducer(initialProductsState);

export function productsReducer(state: ProductsState, action: Action): ProductsState {
    return reducer(state, action);
}
