import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { selectIsEmpty } from '../@ngrx';
import { go } from '../@ngrx/router/router.actions';

@Injectable({
  providedIn: 'root'
})
export class CartIsNotEmptyGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private readonly store: Store) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.cartIsNotEmpty();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.cartIsNotEmpty();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.cartIsNotEmpty();
  }

  private cartIsNotEmpty(): Observable<boolean> {
    return this.store.pipe(
      select(selectIsEmpty),
      switchMap(isEmpty => {
        if (isEmpty) {
          this.store.dispatch(go({ path: ['/cart'] }));

          return of(false);
        }

        return of(true);
      }),
      take(1));
  }
}
