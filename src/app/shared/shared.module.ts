import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { HighlightDirective } from './directives/highlight/highlight.directive';


@NgModule({
    imports: [
        CommonModule,
        // MaterialModule,
        // FlexLayoutModule,
        // RouterModule // компоненты текущего модуля не нуждаются в услугах даного модуля, можно сюда не импортировать
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule,
        HighlightDirective
    ],
    declarations: [HighlightDirective]
})
export class SharedModule { }
