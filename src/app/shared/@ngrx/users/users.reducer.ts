import { Action, createReducer, on } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { initialUsersState, UsersState } from './users.state';

const reducer = createReducer(initialUsersState,
    on(UsersActions.loginUserSuccess, (state, { user }) => {
        return { ...state, user };
    }),
    on(UsersActions.userLogoutSuccess, state => {
        return { ...state, user: null }
    })
);

export function usersReducer(state: UsersState, action: Action): UsersState {
    return reducer(state, action);
}
