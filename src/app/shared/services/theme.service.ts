import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { filter, map } from 'rxjs/operators';

import { AppConfig, UsersService } from '.';
import { AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(AppConfig) private readonly appConfig: AppConfig,
    private readonly appSettings: AppSettingsService,
    private readonly usersService: UsersService) {

    const user = this.usersService.getCurrentUser();
    if (!!user) {
      this.appSettings.get(user.username).pipe(
        map(settings => settings.isDarkTheme), 
        filter(this.isSwitchThemeRequired)).subscribe(this.toggleTheme);
    }

    this.appSettings.settings$.pipe(
      map(settings => settings.isDarkTheme),
      filter(this.isSwitchThemeRequired)
    ).subscribe(this.toggleTheme);
  }

  private toggleTheme(): void {
    this.document.body.classList.toggle(this.appConfig.darkThemeClassName);
  }

  private isSwitchThemeRequired(isDarkTheme: boolean): boolean {
    return (isDarkTheme && !this.darkThemeIsSet()) || (!isDarkTheme && this.darkThemeIsSet());
  }

  private darkThemeIsSet(): boolean {
    return this.document.body.classList.contains(this.appConfig.darkThemeClassName);
  }
}
