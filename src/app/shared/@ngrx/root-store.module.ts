import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { CartStoreModule } from './cart/cart-store.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [],
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
        CartStoreModule,
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ]
})
export class RootStoreModule {
}
