import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { areProductsLoaded, ProductsState } from '../@ngrx/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsPreloadingGuard implements CanActivate {

  constructor(private store: Store<ProductsState>) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return areProductsLoaded(this.store).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
