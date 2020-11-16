import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductComponent, ProductListComponent, ProductItemComponent } from './index';

const components = [
    ProductComponent,
    ProductListComponent,
    ProductItemComponent
];

@NgModule({
    imports: [SharedModule],
    declarations: [...components],
    exports: [...components]
})
export class ProductsModule { }
