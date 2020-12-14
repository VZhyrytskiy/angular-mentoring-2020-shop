import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { usersReducer, UsersEffects } from '.';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('users', usersReducer),
        EffectsModule.forFeature([UsersEffects])
    ]
})
export class UserStoreModule { }
