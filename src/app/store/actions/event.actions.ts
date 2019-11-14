import { Action } from '@ngrx/store';

import { IEvent } from '@myInterface/event.interface';

export enum  EEventActions {
    GetEvents = '[Event] Get Events',
    GetEventsSuccess = '[Event] Get Events Success',
    GetEventsError = '[Event] Get Events Error',

    GetEvent = '[Event] Get Event',
    GetEventSuccess = '[Event] Get Event Success',
    GetEventError = '[Event] Get Event Error',

    AddEvent = '[Event] Add Event',
    AddEventSuccess = '[Event] Add Event Success',
    AddEventError = '[Event] Add Event Error',

    UpdateEvent = '[Event] Update Event',
    UpdateEventSuccess = '[Event] Update Event Success',
    UpdateEventError = '[Event] Update Event Error',

    CancelEvent = '[Event] Cancel Event',
    CancelEventSuccess = '[Event] Cancel Event Success',
    CancelEventError = '[Event] Cancel Event Error'
}
/***********************************
 *************GET EVENTS************
 ***********************************/
export class GetEvents implements Action {
    public readonly type = EEventActions.GetEvents;
}

export class GetEventsSuccess implements Action {
    public readonly type = EEventActions.GetEventsSuccess;
    constructor(public payload: IEvent[]) {}
}

export class GetEventsError implements Action {
    public readonly type = EEventActions.GetEventsError;
    constructor(public payload: any) {}
}
/***********************************
 *************GET EVENT************
 ***********************************/
export class GetEvent implements Action {
    public readonly type = EEventActions.GetEvent;
    constructor(public payload: string) {}
}

export class GetEventSuccess implements Action {
    public readonly type = EEventActions.GetEventSuccess;
    constructor(public payload: IEvent) {}
}

export class GetEventError implements Action {
    public readonly type = EEventActions.GetEventError;
    constructor(public payload: any) {}
}
/***********************************
 *************ADD EVENT*************
 ***********************************/
export class AddEvent implements Action {
    public readonly type = EEventActions.AddEvent;
    constructor(public payload: IEvent) {}
}

export class AddEventSuccess implements Action {
    public readonly type = EEventActions.AddEventSuccess;
    constructor(public payload: IEvent) {}
}

export class AddEventError implements Action {
    public readonly type = EEventActions.AddEventError;
    constructor(public payload: any) {}
}

/***********************************
 *************UPDATE EVENTS**********
 ***********************************/
export class UpdateEvent implements Action {
    public readonly type = EEventActions.UpdateEvent;
    constructor(public payload: IEvent) {}
}

export class UpdateEventSuccess implements Action {
    public readonly type = EEventActions.UpdateEventSuccess;
    constructor(public payload: IEvent) {}
}

export class UpdateEventError implements Action {
    public readonly type = EEventActions.UpdateEventError;
    constructor(public payload: any) {}
}
/***********************************
 *************CANCEL EVENTS**********
 ***********************************/
export class CancelEvent implements Action {
    public readonly type = EEventActions.CancelEvent;
    constructor(public payload: IEvent) {}
}

export class CancelEventSuccess implements Action {
    public readonly type = EEventActions.CancelEventSuccess;
    constructor(public payload: IEvent) {}
}

export class CancelEventError implements Action {
    public readonly type = EEventActions.CancelEventError;
    constructor(public payload: any) {}
}

export type EventActions = GetEvents | GetEventsSuccess | GetEventsError |
    GetEvent | GetEventSuccess | GetEventError |
    AddEvent | AddEventSuccess | AddEventError |
    UpdateEvent | UpdateEventSuccess | UpdateEventError |
    CancelEvent | CancelEventSuccess | CancelEventError;
