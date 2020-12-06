import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { filter, pluck, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { getProductItem, getProductItemSuccess } from '../shared/@ngrx/products';
import { ProductModel } from './models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductModel> {

    constructor(private store: Store, private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot): Promise<ProductModel> {
        const id = route.paramMap.get('id');

        const product = this.actions$.pipe(
            ofType(getProductItemSuccess),
            filter(action => action.product.id === id),
            pluck('product'),
            take(1)
        ).toPromise();

        this.store.dispatch(getProductItem({ id }));

        return product;
    }
}
