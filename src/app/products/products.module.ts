import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductComponent, ProductListComponent, ProductItemComponent } from './index';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ProductComponent,
        ProductListComponent,
        ProductItemComponent
    ],
    exports: [
        ProductItemComponent,
        ProductListComponent
    ]
})
export class ProductsModule { }
