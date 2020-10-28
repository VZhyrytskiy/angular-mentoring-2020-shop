import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatMenuModule,
        MatButtonModule,
        MatSidenavModule,
        MatCardModule,
        MatListModule,
        MatInputModule,
        MatSnackBarModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatMenuModule,
        MatButtonModule,
        MatSidenavModule,
        MatCardModule,
        MatListModule,
        MatInputModule,
        MatSnackBarModule
    ]
})
export class MaterialModule { }