import {
  AfterViewInit, Component, ElementRef,
  Inject, OnInit, ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

import * as UsersActions from '../../@ngrx/users/users.actions';
import {
  selectUserRoles, selectUser,
  selectUserName, selectIsDarkTheme
} from '../../@ngrx/users';
import { selectTotalQuantity } from '../../@ngrx/cart';
import { go } from '../../@ngrx/router/router.actions';
import { LoginComponent } from '../login/login.component';
import { AppConfig } from './../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('appTitle') titleRef: ElementRef<HTMLHeadingElement>;

  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  totalQuantity$: Observable<number>;
  username$: Observable<string>;
  isDarkTheme$: Observable<boolean>;

  constructor(
    @Inject(AppConfig) private appConfig: AppConfig,
    private loginDialog: MatDialog,
    private actions$: Actions,
    public store: Store) { }

  onLoginClick(): void {
    this.loginDialog.open(LoginComponent);
  }

  onLogoutClick(): void {
    this.store.dispatch(UsersActions.userLogout());
  }

  onChange(event: MatSlideToggleChange): void {
    this.store.dispatch(UsersActions.userChangesTheme({ isDark: event.checked }));
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(
      select(selectUser),
      switchMap(user => of(user !== null))
    );

    this.username$ = this.store.pipe(
      select(selectUserName),
      filter(name => name !== null)
    );

    this.actions$.pipe(
      ofType(UsersActions.userLogoutSuccess),
      tap(() => this.store.dispatch(go({ path: [''] }))),
      take(1)).subscribe();

    this.isAdmin$ = this.store.pipe(
      select(selectUserRoles),
      switchMap(roles => of(roles.some(role => role === 'admin')))
    );

    this.isDarkTheme$ = this.store.select(selectIsDarkTheme);
    this.totalQuantity$ = this.store.select(selectTotalQuantity);
  }

  ngAfterViewInit(): void {
    this.titleRef.nativeElement.textContent = this.appConfig.title;
  }
}
