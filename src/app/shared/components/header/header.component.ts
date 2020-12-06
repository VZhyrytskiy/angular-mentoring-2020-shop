import {
  AfterViewInit, Component, ElementRef,
  Inject, OnInit, ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { selectIsAdminUser, selectTotalQuantity, selectUser, userLogout, userLogoutSuccess } from '../../@ngrx';
import { go } from '../../@ngrx/router/router.actions';
import { ThemeService } from '../../services/theme.service';
import { LoginComponent } from '../login/login.component';
import { AppConfig } from './../../services/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('appTitle') titleRef: ElementRef<HTMLHeadingElement>;

  userName: BehaviorSubject<string> = new BehaviorSubject(null);
  isLoggedIn: Observable<boolean>;
  isAdmin: Observable<boolean>;
  totalQuantity: Observable<number>;

  constructor(
    public themeService: ThemeService,
    public store: Store,
    @Inject(AppConfig) private appConfig: AppConfig,
    private loginDialog: MatDialog,
    private actions$: Actions) { }

  onLoginClick(): void {
    this.loginDialog.open(LoginComponent);
  }

  onLogoutClick(): void {
    this.store.dispatch(userLogout());
  }

  onChange(event: MatSlideToggleChange): void {
    this.themeService.setIsDarkTheme(this.userName.getValue(), event.checked);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.store.pipe(
      select(selectUser),
      switchMap(user => {
        const isLogged = user !== null && user !== undefined;

        if (isLogged) {
          this.userName.next(user.username);
        }

        return of(isLogged);
      }));

    this.actions$.pipe(
      ofType(userLogoutSuccess),
      tap(() =>
        this.store.dispatch(go({ path: [''] }))
      ),
      take(1)
    ).subscribe();

    this.isAdmin = this.store.pipe(select(selectIsAdminUser));
    this.totalQuantity = this.store.pipe(select(selectTotalQuantity));
  }

  ngAfterViewInit(): void {
    this.titleRef.nativeElement.textContent = this.appConfig.title;
  }
}
