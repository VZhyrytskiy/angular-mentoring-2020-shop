import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserModel } from '../../models/user.model';

import { UsersState } from './users.state';

export const selectUsersState = createFeatureSelector<UsersState>('users');
export const selectUser = createSelector(selectUsersState, (state: UsersState) => state.user);
export const selectIsAdminUser = createSelector(selectUser,
    (state: UserModel) => state?.roles.some(role => role === 'admin'));
