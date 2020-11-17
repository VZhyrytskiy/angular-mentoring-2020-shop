import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { FontAdjustmentDirective } from './directives/font-adjustment/font-adjustment.directive';
import { HeaderComponent, LoginComponent, FeatureNotAvailableComponent } from './components';

const imports = [
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
];

const declarations = [
    HeaderComponent,
    LoginComponent,
    FeatureNotAvailableComponent,
    HighlightDirective,
    FontAdjustmentDirective,
    OrderByPipe
];

@NgModule({
    imports,
    exports: [...imports, ...declarations],
    declarations
})
export class SharedModule { }
