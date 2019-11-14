import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from '@myInterface/app.interface';
import { eventReducer, eventEntityReducer } from './event.reducers';
import { loaderReducer } from './loader.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
    events: eventReducer,
    eventsEntity: eventEntityReducer,
    loader: loaderReducer
};
