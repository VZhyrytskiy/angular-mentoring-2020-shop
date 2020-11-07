import { AfterViewInit, Component, ElementRef, Inject, Optional, ViewChild } from '@angular/core';

import { AppConfig, ConstantsService } from './shared/services/constants.service';
import { generatorFactory, GeneratedId } from './shared/services/generator.factory';
import { GeneratorService } from './shared/services/generator.service';

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
export class AppComponent implements AfterViewInit {

  @ViewChild('appTitle') titleRef: ElementRef<HTMLHeadingElement>;

  constructor(@Inject(AppConfig) private readonly appConfig: AppConfig,
              @Optional() @Inject(GeneratedId) private readonly id: string) {
    console.log(id);
  }

  ngAfterViewInit(): void {
    this.titleRef.nativeElement.textContent = this.appConfig.title;
  }
}
