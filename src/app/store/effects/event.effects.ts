import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { IEvent } from '@myInterface/event.interface';
import {
    EEventActions,
    GetEvents,
    GetEventsSuccess,
    GetEventsError,
    AddEvent,
    AddEventSuccess,
    AddEventError,
    UpdateEvent,
    UpdateEventSuccess,
    UpdateEventError,
    CancelEvent,
    CancelEventSuccess,
    CancelEventError
} from '@myStore/actions/event.actions';
import { EventService } from '@myServices/event.service';

@Injectable()
export class EventEffects {
    constructor(private _actions$: Actions, private _eventService: EventService) {}

    @Effect()
    getEvents$ = this._actions$.pipe(
        ofType<GetEvents>(EEventActions.GetEvents),
        mergeMap(() => this._eventService.getAll().pipe(
            map((events: IEvent[]) => new GetEventsSuccess(events)),
            catchError((err) => of(new GetEventsError(err)))
        ))
    );

    @Effect()
    addEvent$ = this._actions$.pipe(
        ofType<AddEvent>(EEventActions.AddEvent),
        mergeMap((action) => this._eventService.create(action.payload).pipe(
            map(() => new AddEventSuccess(action.payload)),
            catchError((err) => of(new AddEventError(err)))
        ))
    );

    @Effect()
    updateEvent$ = this._actions$.pipe(
        ofType<UpdateEvent>(EEventActions.UpdateEvent),
        mergeMap((action) => this._eventService.update(action.payload).pipe(
            map(() => new UpdateEventSuccess(action.payload)),
            catchError((err) => of(new UpdateEventError(err)))
        ))
    );

    @Effect()
    cancelEvent$ = this._actions$.pipe(
        ofType<CancelEvent>(EEventActions.CancelEvent),
        mergeMap((action) => this._eventService.delete(action.payload).pipe(
            map(() => new CancelEventSuccess(action.payload)),
            catchError((err) => of(new CancelEventError(err)))
        ))
    );
}
