import { Action } from '@ngrx/store';
import {
    EEventActions,
    GetEvents,
    GetEventsSuccess,
    GetEventsError,
    GetEvent,
    GetEventSuccess,
    GetEventError,
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

export enum ELoaderActions {
    ShowLoader = '[Loader] Show Loader',
    HideLoader = '[Loader] Hide Loader'
}

export class ShowLoader implements Action {
    public readonly type = ELoaderActions.ShowLoader;
}

export class HideLoader implements Action {
    public readonly type = ELoaderActions.HideLoader;
}

export type LoaderActions = ShowLoader | HideLoader;
export type ShowLoaderTypes = GetEvents | GetEvent | AddEvent | UpdateEvent | CancelEvent;
export const ShowLoaderActions = [
    EEventActions.GetEvents,
    EEventActions.GetEvent,
    EEventActions.AddEvent,
    EEventActions.UpdateEvent,
    EEventActions.CancelEvent
];
export type HideLoaderTypes = GetEventsSuccess | GetEventsError | GetEventSuccess | GetEventError |
    AddEventSuccess | AddEventError | UpdateEventSuccess | UpdateEventError | CancelEventSuccess | CancelEventError;
export const HideLoaderActions = [
    EEventActions.GetEventsSuccess,
    EEventActions.GetEventsError,
    EEventActions.GetEventSuccess,
    EEventActions.GetEventError,
    EEventActions.AddEventSuccess,
    EEventActions.AddEventError,
    EEventActions.UpdateEventSuccess,
    EEventActions.UpdateEventError,
    EEventActions.CancelEventSuccess,
    EEventActions.CancelEventError
];
