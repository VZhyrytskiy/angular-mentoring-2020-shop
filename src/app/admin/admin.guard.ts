import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivateChild, UrlTree, Router, CanLoad, Route, UrlSegment
} from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsersService } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private readonly usersService: UsersService, private readonly router: Router) { }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.isAdmin();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.isAdmin();
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.isAdmin();
  }

  private isAdmin(): Observable<boolean | UrlTree> {
    return this.usersService.isCurrentUserInRole('admin').pipe(
      map(isAdmin => {
        if (!isAdmin) {
          return this.router.parseUrl('/not-found');
        }
        return true;
      }));
  }
}
