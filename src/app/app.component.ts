import { Component, Inject, OnInit, Optional } from '@angular/core';

import { Store } from '@ngrx/store';

import { getLocalCartItems } from './shared/@ngrx';
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

  constructor(@Optional() @Inject(GeneratedId) private id: string, private store: Store) { }

  ngOnInit(): void {

    if (this.id) {
      console.log(`GeneratedId: ${this.id}`);
    }

    this.store.dispatch(getLocalCartItems());
  }
}
