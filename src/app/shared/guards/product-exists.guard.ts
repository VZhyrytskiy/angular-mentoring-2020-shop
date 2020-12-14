import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import {
  areProductsLoaded,
  ProductsState,
  selectProductItems
} from '../@ngrx/products';
import * as RouterActions from './../../shared/@ngrx/router/router.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductExistsGuard implements CanActivate {

  constructor(private store: Store<ProductsState>) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

    return areProductsLoaded(this.store).pipe(
      switchMap(() => this.isProductExists(route.paramMap.get('id')))
    );
  }

  private isProductExists(id: string): Observable<boolean> {
    return this.store.pipe(
      select(selectProductItems),
      map(items => !!items.find(item => item.id === id)),
      tap(isFound => {
        if (!isFound) {
          this.store.dispatch(RouterActions.go({ path: [''] }));
        }
      }),
      take(1)
    );
  }
}
