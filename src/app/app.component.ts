import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';

import { map } from 'rxjs/operators';

import { AppConfig, GeneratedId, GeneratorService } from './shared/index';
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
    }
  ]
})
export class AppComponent implements OnInit {
  constructor(
    @Optional() @Inject(GeneratedId) private readonly id: string,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(AppConfig) private readonly appConfig: AppConfig,
    private readonly appSettings: AppSettingsService) {

  }

  ngOnInit(): void {
    this.appSettings.channel$.pipe(map(x => x.isDarkTheme)).subscribe(x => {
      this.document.body.classList.toggle(this.appConfig.darkThemeClassName);
    });
  }
}
