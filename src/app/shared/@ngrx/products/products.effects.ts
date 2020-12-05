import { Injectable } from '@angular/core';

import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { ProductsService } from 'src/app/products/services/products.service';

@Injectable()
export class ProductsEffects {

    constructor(private actions$: Actions,
                private productsService: ProductsService,
                private store: Store<AppState>) { }
}
