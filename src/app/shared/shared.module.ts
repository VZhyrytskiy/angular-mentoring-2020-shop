import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { FontAdjustmentDirective } from './directives/font-adjustment/font-adjustment.directive';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule,
        HighlightDirective,
        FontAdjustmentDirective,
        OrderByPipe,
        HeaderComponent,
        LoginComponent
    ],
    declarations: [
        HeaderComponent,
        LoginComponent,
        HighlightDirective,
        FontAdjustmentDirective,
        OrderByPipe
    ]
})
export class SharedModule { }
