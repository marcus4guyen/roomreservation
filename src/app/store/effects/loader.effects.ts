import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    ShowLoader,
    ShowLoaderTypes,
    ShowLoaderActions,
    HideLoader,
    HideLoaderTypes,
    HideLoaderActions
} from '@myStore/actions/loader.actions';

@Injectable()
export class LoaderEffects {
    constructor(private _actions$: Actions) {}

    @Effect()
    showLoader$: Observable<Action> = this._actions$.pipe(
        ofType<ShowLoaderTypes>(...ShowLoaderActions),
        map(() => new ShowLoader())
    );

    @Effect()
    hideLoader$: Observable<Action> = this._actions$.pipe(
        ofType<HideLoaderTypes>(...HideLoaderActions),
        map(() => new HideLoader())
    );
}
