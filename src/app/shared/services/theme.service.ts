import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { AppConfig } from '.';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(AppConfig) private appConfig: AppConfig) {
  }

  toggle(): void {
    this.document.body.classList.toggle(this.appConfig.darkThemeClassName);
  }

  isNotMatchToCurrent(isDarkTheme: boolean): boolean {
    const currentThemeIsDark = this.document.body.classList.contains(this.appConfig.darkThemeClassName);
    return isDarkTheme !== currentThemeIsDark;
  }
}
