import { createEntityAdapter } from '@ngrx/entity';
import { IEventState, IEvent } from '@myInterface/event.interface';

export const initialEventState: IEventState = {
    events: null,
    selectedEvent: null,
    action: null,
    done: false,
    error: null
};

export const eventAdapter = createEntityAdapter<IEvent>();

export const initialEventEntityState = eventAdapter.getInitialState();
