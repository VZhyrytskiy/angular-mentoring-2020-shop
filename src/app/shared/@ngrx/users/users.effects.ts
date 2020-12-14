import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { EMPTY, Observable, of } from 'rxjs';
import {
    catchError, concatMap, filter,
    map, mergeMap, switchMap,
    tap, withLatestFrom
} from 'rxjs/operators';

import * as UsersActions from './users.actions';
import { UsersService } from '../../services';
import { AppSettingsService } from '../../services/app-settings.service';
import { ThemeService } from '../../services/theme.service';
import { selectIsDarkTheme, selectUserName, selectUsersState } from './users.selectors';
import { go } from '../router/router.actions';

@Injectable()
export class UsersEffects {

    userLogin$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loginUser),
            mergeMap(action => of(this.usersService.login(action.username)).pipe(
                map(user => UsersActions.loginUserSuccess({ user })),
                catchError(() => EMPTY))
            )
        )
    );

    loadLocalSettings$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loginUserSuccess),
            concatMap(action => of(action).pipe(
                withLatestFrom(this.store.select(selectUserName))
            )),
            switchMap(([, username]) =>
                of(this.appSettings.getLocalSettings(username)).pipe(
                    map(settings => {
                        if (settings !== null) {
                            return UsersActions.userLoadLocalSettingSuccess({ settings });
                        }

                        return UsersActions.userFetchSettings();
                    }),
                    catchError(async () => UsersActions.userLoadLocalSettingFailture())
                ))
        )
    );

    fetchSettings$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.userLoadLocalSettingFailture, UsersActions.userFetchSettings),
            concatMap(action => of(action).pipe(
                withLatestFrom(this.store.select(selectUserName))
            )),
            switchMap(([, username]) => this.appSettings.fetch(username).pipe(
                map(settings => UsersActions.userFetchSettingsSuccess({ settings })),
                catchError(async () => UsersActions.userFetchSettingsFailture())
            ))
        )
    );

    userLoadFromLocal$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUserFromLocal),
            concatMap(() => of(this.usersService.loadFromLocal()).pipe(
                filter(user => user !== null),
                map(user => UsersActions.loadUserFromLocalSuccess({ user }))
            ))
        )
    );

    userLoadFromLocalPostLogin$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUserFromLocalSuccess),
            switchMap(async (action) => UsersActions.loginUser({ username: action.user.username }))
        )
    );

    userLogout$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.userLogout),
            switchMap(() => of(this.usersService.logout()).pipe(
                map(() => UsersActions.userLogoutSuccess()),
                catchError(() => EMPTY)
            ))
        )
    );

    userLogoutSuccess$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.userLogoutSuccess),
            tap(() => this.store.dispatch(go({ path: [''] })))
        ),
        {
            dispatch: false
        }
    );

    updateThemeSettings$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.userChangesTheme),
            concatMap(action => of(action).pipe(
                withLatestFrom(this.store.select(selectUsersState))
            )),
            tap(([action, state]) => {
                const settings = { ...state.appSettings, isDarkTheme: action.isDark };
                this.appSettings.updateLocalSettings(state.user.username, settings);
            }),
            map(([action, ]) => UsersActions.userChangesThemeSuccess({ isDark: action.isDark }))
        )
    );

    restoreThemePreference$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.userFetchSettingsSuccess,
                UsersActions.userLoadLocalSettingSuccess,
                UsersActions.userChangesThemeSuccess,
                UsersActions.userLogoutSuccess),
            concatMap(action => of(action).pipe(
                withLatestFrom(this.store.select(selectIsDarkTheme))
            )),
            filter(([, isDarkTheme]) => this.themeService.isNotMatchToCurrent(isDarkTheme)),
            tap(() => this.themeService.toggle()),
            map(([, isDarkTheme]) => UsersActions.userChangesThemeSuccess({ isDark: isDarkTheme }))
        )
    );

    constructor(private actions$: Actions, private usersService: UsersService,
                private themeService: ThemeService, private appSettings: AppSettingsService,
                private store: Store) { }
}
