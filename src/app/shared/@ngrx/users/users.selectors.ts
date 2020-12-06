import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppSettingsModel } from '../../models/app-settings.model';

import { UserModel } from '../../models/user.model';
import { UsersState } from './users.state';

export const selectUsersState = createFeatureSelector<UsersState>('users');
export const selectUser = createSelector(selectUsersState, (state: UsersState) => state.user);
export const selectIsAdminUser = createSelector(selectUser,
    (state: UserModel) => state?.roles.some(role => role === 'admin'));
export const selectUserName = createSelector(selectUser, (state: UserModel) => state?.username);
export const selectAppSettings = createSelector(selectUsersState, (state: UsersState) => state.appSettings);
export const selectIsDarkTheme = createSelector(selectAppSettings, (state: AppSettingsModel) => state.isDarkTheme);
