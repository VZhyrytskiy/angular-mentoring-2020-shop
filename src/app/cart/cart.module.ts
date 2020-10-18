import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartService } from './services/cart.service';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [
        CartItemComponent,
        CartListComponent
    ],
    exports: [
        CartItemComponent,
        CartListComponent
    ],
    providers: [
        CartService
    ]
})
export class CartModule { }
