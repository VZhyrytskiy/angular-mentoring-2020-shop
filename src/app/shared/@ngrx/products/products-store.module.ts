import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { productsReducer, ProductsEffects } from '.';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('products', productsReducer),
        EffectsModule.forFeature([ProductsEffects])
    ]
})
export class ProductsStoreModule {
}
