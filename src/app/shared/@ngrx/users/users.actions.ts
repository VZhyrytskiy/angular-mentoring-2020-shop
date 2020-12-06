import { createAction, props } from '@ngrx/store';

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
)

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
)

export const userChangesThemeSuccess = createAction(
    '[User] USER_CHANGES_THEME_SUCCESS'
)

export const userLogoutSuccess = createAction(
    '[User Logout Effect] USER_LOGOUT_SUCCESS'
);
