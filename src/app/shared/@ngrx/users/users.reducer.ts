import { Action, createReducer } from '@ngrx/store';

import { initialUsersState,  UsersState } from './users.state';

const reducer = createReducer(initialUsersState);

export function usersReducer(state: UsersState, action: Action): UsersState {
    return reducer(state, action);
}
