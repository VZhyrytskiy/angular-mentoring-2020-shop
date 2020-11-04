import { InjectionToken } from '@angular/core';

export interface AppConfig {
  title: string;
}

export const AppConfig = new InjectionToken<AppConfig>('app.config');

export const ConstantsService: AppConfig = {
  title: 'Shop'
};
