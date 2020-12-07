import { createAction, props } from '@ngrx/store';
import { AppSettingsModel } from '../../models/app-settings.model';

import { UserModel } from '../../models/user.model';

export const loginUser = createAction(
    '[User] USER_LOGIN',
    props<{ username: string }>()
);

export const loadUserFromLocal = createAction(
    '[User] USER_LOAD_FROM_LOCAL'
);

export const loadUserFromLocalSuccess = createAction(
    '[User Load From Local Effect] USER_LOAD_FROM_LOCAL_SUCCESS',
    props<{ user: UserModel }>()
);

export const loginUserSuccess = createAction(
    '[User Login Effect] USER_LOGIN_SUCCESS',
    props<{ user: UserModel }>()
);

export const userLogout = createAction(
    '[User] USER_LOGOUT'
);

export const userChangesTheme = createAction(
    '[User] USER_CHANGES_THEME',
    props<{ isDark: boolean }>()
);

export const userChangesThemeSuccess = createAction(
    '[User Changes Theme Effect] USER_CHANGES_THEME_SUCCESS',
    props<{ isDark: boolean }>()
);

export const userLogoutSuccess = createAction(
    '[User Logout Effect] USER_LOGOUT_SUCCESS'
);

export const userLoadLocalSettingSuccess = createAction(
    '[User Login Success Effect] USER_LOAD_LOCAL_SETTINGS_SUCCESS',
    props<{ settings: AppSettingsModel }>()
);

export const userLoadLocalSettingFailture = createAction(
    '[User Login Success Effect] USER_LOAD_LOCAL_SETTINGS_FAILTURE'
);

export const userFetchSettings = createAction(
    '[User Login Success Effect] FETCH_SETTINGS',
);

export const userFetchSettingsSuccess = createAction(
    '[User Login Success Effect] USER_FETCH_SETTINGS_SUCCESS',
    props<{ settings: AppSettingsModel }>()
);

export const userFetchSettingsFailture = createAction(
    '[User Login Success Effect] USER_FETCH_SETTINGS_FAILTURE'
);
