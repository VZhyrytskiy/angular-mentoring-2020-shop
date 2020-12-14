import { Action, createReducer, on } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { initialUsersState, UsersState } from './users.state';

const reducer = createReducer(initialUsersState,
    on(UsersActions.loginUserSuccess, (state, { user }) => {
        return {
            ...state,
            user
        };
    }),
    on(UsersActions.userLogoutSuccess, () => {
        return { ...initialUsersState };
    }),
    on(UsersActions.userFetchSettingsSuccess, (state, { settings }) => {
        return {
            ...state,
            appSettings: settings
        };
    }),
    on(UsersActions.userChangesThemeSuccess, (state, { isDark }) => {
        return {
            ...state,
            appSettings: {
                ...state.appSettings,
                isDarkTheme: isDark
            }
        };
    }),
    on(UsersActions.userLoadLocalSettingSuccess, (state, { settings }) => {
        return {
            ...state,
            appSettings: settings
        };
    })
);

export function usersReducer(state: UsersState, action: Action): UsersState {
    return reducer(state, action);
}
