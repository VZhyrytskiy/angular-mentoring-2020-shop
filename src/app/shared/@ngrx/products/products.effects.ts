import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { EMPTY, from, Observable } from 'rxjs';
import { catchError, map, mergeMap, pluck, switchMap } from 'rxjs/operators';

import { ProductsService } from 'src/app/products/services/products.service';
import * as productsActions from './products.actions';
import { ProductsState } from './products.state';

@Injectable()
export class ProductsEffects {

    getProductItems: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(productsActions.getProductItems),
            mergeMap(() => this.productsService.getProducts().pipe(
                map(products => productsActions.getProductItemsSuccess({ products })),
                catchError(() => EMPTY)
            ))
        )
    );

    getProductItem: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(productsActions.getProductItem),
            pluck("id"),
            switchMap(id => from(this.productsService.getProductById(id)).pipe(
                map(product => productsActions.getProductItemSuccess({ product })),
                catchError(() => EMPTY)
            ))
        )
    );

    constructor(private actions$: Actions,
        private productsService: ProductsService) { }
}
