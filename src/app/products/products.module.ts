import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductComponent, ProductListComponent } from './index';

@NgModule({
    imports: [
        SharedModule
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
