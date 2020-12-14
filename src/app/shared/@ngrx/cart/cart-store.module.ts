import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CartEffects, cartReducer } from '.';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('cart', cartReducer),
        EffectsModule.forFeature([CartEffects])
    ]
})
export class CartStoreModule { }
