import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivateChild,
  CanLoad, Route, UrlSegment
} from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { selectUserRoles } from '../@ngrx';
import { go } from '../@ngrx/router/router.actions';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private store: Store) { }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.isAdmin();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAdmin();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAdmin();
  }

  private isAdmin(): Observable<boolean> {
    return this.store.pipe(
      select(selectUserRoles),
      map(roles => {
        const isAdmin = roles.some(role => role === 'admin');

        if (!isAdmin) {
          this.store.dispatch(go({ path: ['/not-found'] }));

          return false;
        }

        return isAdmin;
      }));
  }
}
