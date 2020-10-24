import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartListComponent } from './components/cart-list/cart-list.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule
    ],
    declarations: [
        CartItemComponent,
        CartListComponent
    ],
    exports: [
        CartItemComponent,
        CartListComponent
    ]
})
export class CartModule { }
