import { createSelector } from '@ngrx/store';

import { EEventActions } from '@myStore/actions/event.actions';
import { IEventState } from '@myInterface/event.interface';
import { IAppState } from '@myInterface/app.interface';

const selectEvents = (state: IAppState) => state.events;

export const selectEventList = createSelector(selectEvents, (state: IEventState) => state.events);
export const selectSelectedEvent = createSelector(selectEvents, (state: IEventState) => state.selectedEvent);

export const selectGetEventsError = createSelector(selectEvents, (state: IEventState) => {
    return state.action === EEventActions.GetEvents ? state.error : null;
});
export const selectAddEventError = createSelector(selectEvents, (state: any) => {
    return state.action === EEventActions.AddEvent ? state.error : null;
});
export const selectUpdateEventError = createSelector(selectEvents, (state: any) => {
    return state.action === EEventActions.UpdateEvent ? state.error : null;
});
export const selectCancelEventError = createSelector(selectEvents, (state: any) => {
    return state.action === EEventActions.CancelEvent ? state.error : null;
});
