import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { FontAdjustmentDirective } from './directives/font-adjustment/font-adjustment.directive';
import { HeaderComponent, LoginComponent, FeatureNotAvailableComponent, NotFoundComponent } from './components';
import { AppConfig, ConstantsService } from '.';

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
    NotFoundComponent,
    HighlightDirective,
    FontAdjustmentDirective,
    OrderByPipe
];

@NgModule({
    imports,
    exports: [...imports, ...declarations],
    providers: [
        {
            provide: AppConfig,
            useValue: ConstantsService
        }
    ],
    declarations
})
export class SharedModule { }
