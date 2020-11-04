import { NgModule } from '@angular/core';

import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ProductComponent,
        ProductListComponent
    ],
    exports: [ // компонентом управляет роутер, можно не экспортировать или хотя бы экспортировать второй, первый не нужен
        ProductComponent,
        ProductListComponent
    ]
})
export class ProductsModule { }
