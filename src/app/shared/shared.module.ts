import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { AppConfig, ConstantsService } from './services/constants.service';
import { FontAdjustmentDirective } from './directives/font-adjustment/font-adjustment.directive';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule,
        HighlightDirective,
        FontAdjustmentDirective
    ],
    declarations: [
        HighlightDirective,
        FontAdjustmentDirective
    ],
    providers: [
        {
            provide: AppConfig,
            useValue: ConstantsService
        }
    ]
})
export class SharedModule { }
