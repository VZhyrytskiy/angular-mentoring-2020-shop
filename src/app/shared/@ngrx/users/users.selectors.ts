import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppSettingsModel } from '../../models/app-settings.model';

import { UserModel } from '../../models/user.model';
import { UsersState } from './users.state';

export const selectUsersState = createFeatureSelector<UsersState>('users');
export const selectUser = createSelector(selectUsersState, (state: UsersState) => state.user);
export const selectUserRoles = createSelector(selectUser,
    (state: UserModel) => state?.roles || []);
export const selectUserName = createSelector(selectUser, (state: UserModel) => state?.username);
export const selectAppSettings = createSelector(selectUsersState, (state: UsersState) => state.appSettings);
export const selectIsDarkTheme = createSelector(selectAppSettings, (state: AppSettingsModel) => state.isDarkTheme);
