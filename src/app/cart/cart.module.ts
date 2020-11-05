import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CartItemComponent, CartListComponent } from './index';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        CartItemComponent,
        CartListComponent
    ]
})
export class CartModule { }
