import { createAction, props } from '@ngrx/store';

export const loginUser = createAction(
    '[User] USER_LOGIN',
    props<{ username: string }>()
);

