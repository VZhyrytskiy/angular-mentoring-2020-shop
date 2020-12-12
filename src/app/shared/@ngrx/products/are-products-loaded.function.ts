import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

import { selectProductsLoaded } from '.';
import * as ProductsActions from './products.actions';
import { ProductsState } from './products.state';

export const areProductsLoaded = (store: Store<ProductsState>): Observable<boolean> => {
    return store.pipe(
        select(selectProductsLoaded),
        tap((loaded: boolean) => {
            if (!loaded) {
                store.dispatch(ProductsActions.getProductItems());
            }
        }),
        filter((loaded: boolean) => loaded),
        take(1)
    );
};
