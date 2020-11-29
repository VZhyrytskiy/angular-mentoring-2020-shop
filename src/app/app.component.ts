import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';

import { map } from 'rxjs/operators';

import { AppConfig, ConstantsService, GeneratedId, GeneratorService, UsersService } from './shared/index';
import { AppSettingsService } from './shared/services/app-settings.service';
import { generatorFactory } from './shared/services/generator/generator.factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: GeneratedId,
      useFactory: generatorFactory(15),
      deps: [GeneratorService]
    },
    {
      provide: AppConfig,
      useValue: ConstantsService
    }
  ]
})
export class AppComponent implements OnInit {
  constructor(
    @Optional() @Inject(GeneratedId) private readonly id: string,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(AppConfig) private readonly appConfig: AppConfig,
    private readonly appSettings: AppSettingsService,
    private readonly usersService: UsersService) {
  }

  ngOnInit(): void {
    const user = this.usersService.getCurrentUser();
    if (!!user) {
      this.appSettings.get(user.username).subscribe(x => {
        const result = (x.isDarkTheme && !this.darkThemeIsSet()) || (!x.isDarkTheme && this.darkThemeIsSet());
        if (result) {
          this.document.body.classList.toggle(this.appConfig.darkThemeClassName);
        }
      });
    }

    this.appSettings.settings$.pipe(map(x => x.isDarkTheme)).subscribe(isDark => {
      const result = (isDark && !this.darkThemeIsSet()) || (!isDark && this.darkThemeIsSet());
      if (result) {
        this.document.body.classList.toggle(this.appConfig.darkThemeClassName);
      }
    });
  }

  private darkThemeIsSet(): boolean {
    return this.document.body.classList.contains(this.appConfig.darkThemeClassName);
  }
}
