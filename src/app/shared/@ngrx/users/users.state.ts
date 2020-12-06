import { AppSettingsModel } from '../../models/app-settings.model';
import { UserModel } from '../../models/user.model';

export interface UsersState {
    user: UserModel;
    appSettings: AppSettingsModel;
}

const isDarkThemeDefault= false;
const defaultSettings = new AppSettingsModel(isDarkThemeDefault);

export const initialUsersState: UsersState = {
    user: null,
    appSettings: defaultSettings 
};
