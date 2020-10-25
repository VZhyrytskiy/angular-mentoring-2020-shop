import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule
    ],
    declarations: [HighlightDirective]
})
export class SharedModule { }
