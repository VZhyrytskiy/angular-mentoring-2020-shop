import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import { EMPTY, Observable, of } from 'rxjs';
import { catchError, concatMap, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import * as UsersActions from './users.actions';
import { UsersService } from '../../services';
import { AppSettingsService } from '../../services/app-settings.service';
import { ThemeService } from '../../services/theme.service';
import { selectUserName } from './users.selectors';

@Injectable()
export class UsersEffects {

    userLogin$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loginUser),
            switchMap(action => of(this.usersService.login(action.username)).pipe(
                tap(user => this.themeService.restore(user.username)),
                map(user => UsersActions.loginUserSuccess({ user })),
                catchError(() => EMPTY))
            )
        )
    );

    userLoad$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUserFromLocal),
            concatMap(() => of(this.usersService.loadFromLocal()).pipe(
                filter(user => user !== null),
                map(user => UsersActions.loadUserFromLocalSuccess({ user }))
            ))
        )
    );

    userLoginAfterLoad$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUserFromLocalSuccess),
            switchMap(async (action) =>
                UsersActions.loginUser({ username: action.user.username })
            )
        )
    );

    userLogout$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.userLogout),
            switchMap(() => of(this.usersService.logout()).pipe(
                tap(() => this.appSettings.reset()),
                map(() => UsersActions.userLogoutSuccess()),
                catchError(() => EMPTY)
            ))
        )
    );

    userChangedTheme$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.userChangesTheme),
            concatMap(action => of(action).pipe(
                withLatestFrom(this.store.select(selectUserName))
            )),
            tap(([action, name]) => this.themeService.setIsDarkTheme(name, action.isDark)),
            map(() => UsersActions.userChangesThemeSuccess())
        )
    );

    constructor(private actions$: Actions,
        private usersService: UsersService,
        private themeService: ThemeService,
        private appSettings: AppSettingsService,
        private store: Store) { }
}
