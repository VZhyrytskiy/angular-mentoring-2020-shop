import { UserModel } from '../../models/user.model';

export interface UsersState {
    user: UserModel;
}

export const initialUsersState: UsersState = {
    user: null
};
