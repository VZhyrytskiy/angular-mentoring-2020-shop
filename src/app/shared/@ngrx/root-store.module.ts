import { NgModule } from '@angular/core';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared.module';
import { RouterSerializer, routerReducers } from './router';
import { CartStoreModule } from './cart/cart-store.module';
import { ProductsStoreModule } from './products/products-store.module';
import { RouterEffects } from './router/router.effects';
import { UserStoreModule } from './users/users-store.module';

@NgModule({
    imports: [
        SharedModule,
        StoreModule.forRoot(routerReducers, {
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
        EffectsModule.forRoot([RouterEffects]),
        CartStoreModule,
        ProductsStoreModule,
        UserStoreModule,
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ]
})
export class RootStoreModule { }
