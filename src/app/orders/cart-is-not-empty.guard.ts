import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectIsEmpty } from '../shared/@ngrx';

@Injectable({
  providedIn: 'root'
})
export class CartIsNotEmptyGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private readonly store: Store, private readonly router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {

    return this.cartIsNotEmpty();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.cartIsNotEmpty();
  }

  canLoad(route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.cartIsNotEmpty();
  }

  private cartIsNotEmpty(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(selectIsEmpty),
      map(isEmpty => {
        if (isEmpty) {
          this.router.navigateByUrl('/cart');
        }

        return true;
      }));
  }
}
