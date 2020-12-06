import { Injectable } from '@angular/core';

import { Actions } from '@ngrx/effects';

import { UsersService } from '../../services';

@Injectable()
export class UsersEffects {
    constructor(private actions$: Actions, private usersService: UsersService) { }
}
