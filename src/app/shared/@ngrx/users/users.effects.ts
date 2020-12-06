import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { EMPTY, Observable } from 'rxjs';
import { catchError, concatMap, filter, map, switchMap, tap } from 'rxjs/operators';

import * as UsersActions from './users.actions';
import { UsersService } from '../../services';
import { AppSettingsService } from '../../services/app-settings.service';
import { ThemeService } from '../../services/theme.service';

@Injectable()
export class UsersEffects {

    userLogin$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loginUser),
            switchMap(action => this.usersService.login(action.username).pipe(
                tap(user => this.themeService.restore(user.username)),
                map(user => UsersActions.loginUserSuccess({ user })),
                catchError(() => EMPTY))
            )
        )
    );

    userLoad$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUserFromLocal),
            concatMap(() => this.usersService.loadFromLocal().pipe(
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
            switchMap(() => this.usersService.logout().pipe(
                tap(() => this.appSettings.reset()),
                map(() => UsersActions.userLogoutSuccess()),
                catchError(() => EMPTY)
            ))
        )
    );

    constructor(private actions$: Actions,
        private usersService: UsersService,
        private themeService: ThemeService,
        private appSettings: AppSettingsService) { }
}
