import { createAction, props } from '@ngrx/store';

import { UserModel } from '../../models/user.model';

export const loginUser = createAction(
    '[User] USER_LOGIN',
    props<{ username: string }>()
);

export const loginUserSuccess = createAction(
    '[User Login Effect] USER_LOGIN_SUCCESS',
    props<{ user: UserModel }>()
);

export const userLogout = createAction(
    '[User] USER_LOGOUT'
);

export const userLogoutSuccess = createAction(
    '[User Logout Effect] USER_LOGOUT_SUCCESS'
);
