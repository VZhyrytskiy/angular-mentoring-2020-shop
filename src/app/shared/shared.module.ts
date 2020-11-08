import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

import { HighlightDirective } from './directives/highlight/highlight.directive';
import { FontAdjustmentDirective } from './directives/font-adjustment/font-adjustment.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule,
        HighlightDirective,
        FontAdjustmentDirective,
        OrderByPipe
    ],
    declarations: [
        HighlightDirective,
        FontAdjustmentDirective,
        OrderByPipe
    ]
})
export class SharedModule { }
