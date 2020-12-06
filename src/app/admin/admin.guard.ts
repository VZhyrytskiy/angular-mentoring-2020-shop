import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivateChild, UrlTree, CanLoad, Route, UrlSegment
} from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsersService } from '../shared';
import { go } from '../shared/@ngrx/router/router.actions';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private readonly usersService: UsersService, private store: Store) { }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.isAdmin();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.isAdmin();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.isAdmin();
  }

  private isAdmin(): Observable<boolean | UrlTree> {
    return this.usersService.isCurrentUserInRole('admin').pipe(
      map(isAdmin => {
        if (!isAdmin) {
          this.store.dispatch(go({ path: ['/not-found'] }));
        }
        return isAdmin;
      }));
  }
}
