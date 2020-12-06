import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { filter, map } from 'rxjs/operators';

import { AppConfig } from '.';
import { selectIsDarkTheme } from '../@ngrx/users/users.selectors';
import { AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(AppConfig) private appConfig: AppConfig,
    private appSettings: AppSettingsService,
    private store: Store) {
      
    this.store.pipe(
      select(selectIsDarkTheme),
      filter(value => this.isSwitchThemeRequired(value))
    ).subscribe(() => this.toggleTheme());
  }

  setIsDarkTheme(username: string, isDark: boolean): void {
    this.appSettings.get(username).subscribe(settings => {
      this.appSettings.update(username, { ...settings, isDarkTheme: isDark });
    });
  }

  restore(username: string): void {
    if (!!!username) {
      return;
    }

    this.appSettings.get(username).pipe(
      map(settings => settings.isDarkTheme),
      filter(value => this.isSwitchThemeRequired(value))).subscribe(() => this.toggleTheme());
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
