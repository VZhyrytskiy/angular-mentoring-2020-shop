import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import * as t from './shared/@ngrx';

import { GeneratedId, GeneratorService } from './shared/index';
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
  constructor(@Optional() @Inject(GeneratedId) private readonly id: string,
  private readonly store: Store) { }
  ngOnInit(): void {
    this.store.dispatch(t.initializeCartItems())
  }
}
