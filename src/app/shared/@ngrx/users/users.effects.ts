import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { EMPTY, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as UsersActions from '.';
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
        private appSettings: AppSettingsService,
        private store: Store) { }
}
