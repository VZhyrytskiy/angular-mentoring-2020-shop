import { NgModule } from '@angular/core';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared.module';
import { RouterSerializer } from './router';
import { CartStoreModule } from './cart/cart-store.module';
import { ProductsStoreModule } from './products/products-store.module';

@NgModule({
    imports: [
        SharedModule,
        StoreModule.forRoot({}, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictStateSerializability: false,
                strictActionSerializability: false,
                strictActionWithinNgZone: true,
                strictActionTypeUniqueness: true
            }
        }),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
            routerState: RouterState.Minimal,
            serializer: RouterSerializer
        }),
        EffectsModule.forRoot([]),
        CartStoreModule,
        ProductsStoreModule,
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ]
})
export class RootStoreModule {
}
