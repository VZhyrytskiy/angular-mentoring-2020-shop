import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MaterialModule } from '../shared/material.module';
import { ProductsService } from './services/products.service';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        FlexLayoutModule
    ],
    providers: [
        ProductsService
    ],
    declarations: [
        ProductComponent,
        ProductListComponent
    ],
    exports: [
        ProductComponent,
        ProductListComponent
    ]
})
export class ProductsModule { }
