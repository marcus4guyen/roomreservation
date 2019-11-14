import { IEventState, IEventEntityState } from '@myInterface/event.interface';
import { initialEventState, initialEventEntityState, eventAdapter } from '@myStore/state/event.state';
import { EventActions, EEventActions } from '@myStore/actions/event.actions';

import * as _ from 'lodash';

export function eventReducer(state = initialEventState, action: EventActions): IEventState {
    switch (action.type) {
        // =============== GET ALL ===============
        case EEventActions.GetEvents: {
            return {
                ...state,
                action: EEventActions.GetEvents,
                done: false,
                error: null
            };
        }
        case EEventActions.GetEventsSuccess: {
            return {
                ...state,
                events: action.payload,
                done: true,
                error: null
            };
        }
        case EEventActions.GetEventsError: {
            return {
                ...state,
                done: true,
                error: action.payload
            };
        }

        // =============== ADD ===============
        case EEventActions.AddEvent: {
            return {
                ...state,
                action: EEventActions.AddEvent,
                selectedEvent: action.payload,
                done: false,
                error: null
            };
        }
        case EEventActions.AddEventSuccess: {
            const newEvent = {
                ...state.selectedEvent
            };

            const events = [
                ...state.events,
                newEvent
            ];

            return {
                ...state,
                events,
                selectedEvent: null,
                done: true,
                error: null
            };
        }
        case EEventActions.AddEventError: {
            return {
                ...state,
                selectedEvent: null,
                done: true,
                error: action.payload
            };
        }

        // =============== UPDATE ===============
        case EEventActions.UpdateEvent: {
            return {
                ...state,
                action: EEventActions.UpdateEvent,
                selectedEvent: action.payload,
                done: false,
                error: null
            };
        }
        case EEventActions.UpdateEventSuccess: {
            const updatedEventIndex = _.findIndex(state.events, { id: state.selectedEvent.id });

            if (updatedEventIndex >= 0) {
                state.events.splice(updatedEventIndex, 1, state.selectedEvent);

                return {
                    ...state,
                    selectedEvent: null,
                    done: true,
                    error: null
                };
            }

            return state;
        }
        case EEventActions.UpdateEventError: {
            return {
                ...state,
                selectedEvent: null,
                done: true,
                error: action.payload
            };
        }

        // =============== CANCEL ===============
        case EEventActions.CancelEvent: {
            return {
                ...state,
                action: EEventActions.CancelEvent,
                selectedEvent: action.payload,
                done: false,
                error: null
            };
        }
        case EEventActions.CancelEventSuccess: {
            const deletedEventIndex = _.findIndex(state.events, { id: state.selectedEvent.id });

            if (deletedEventIndex >= 0) {
                state.events.splice(deletedEventIndex, 1);

                return {
                    ...state,
                    selectedEvent: null,
                    done: true,
                    error: null
                };
            }

            return state;
        }
        case EEventActions.CancelEventError: {
            return {
                ...state,
                selectedEvent: null,
                done: true,
                error: action.payload
            };
        }

        default:
            return state;
    }
}

export function eventEntityReducer(state = initialEventEntityState, action: EventActions): IEventEntityState {
    switch (action.type) {
        case EEventActions.GetEventsSuccess: {
            return eventAdapter.upsertMany(action.payload, state);
        }
        case EEventActions.AddEventSuccess:
        case EEventActions.UpdateEventSuccess: {
            return eventAdapter.upsertOne(action.payload, state);
        }
        case EEventActions.CancelEvent: {
            return eventAdapter.removeOne(action.payload.id, state);
        }

        default:
            return state;
    }
}
