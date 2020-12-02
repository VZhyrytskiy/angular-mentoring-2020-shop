import { NgModule } from '@angular/core';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { environment } from 'src/environments/environment';
import { CartStoreModule } from './cart/cart-store.module';
import { SharedModule } from '../shared.module';

@NgModule({
    imports: [
        SharedModule,
        StoreModule.forRoot({}, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictStateSerializability: true,
                strictActionSerializability: true,
                strictActionWithinNgZone: true,
                strictActionTypeUniqueness: true
            }
        }),
        EffectsModule.forRoot([]),
        CartStoreModule,
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ]
})
export class RootStoreModule {
}
