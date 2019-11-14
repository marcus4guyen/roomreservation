import { IEventState, IEventEntityState } from './event.interface';
import { ILoaderState } from './loader.interface';

export interface IAppState {
    events: IEventState;
    eventsEntity: IEventEntityState;
    loader: ILoaderState;
}
