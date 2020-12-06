import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const forward = createAction(
    '[Router] FORWARD'
);

export const back = createAction(
    '[Router] BACK'
);

export const go = createAction(
    '[Router] GO',
    props<{ path: object[]; queryParams?: object; extras?: NavigationExtras }>()
);
