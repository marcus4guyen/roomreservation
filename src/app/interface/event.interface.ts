import { EntityState } from '@ngrx/entity';

export interface IEvent {
    __id?: string; // firebase's id
    id: string;
    title: string;
    start: number;
    end: number;
}

export interface IEventMode {
    NEW: string;
    UPDATE: string;
    DELETE: string;
}

export interface IEventState {
    events: IEvent[];
    selectedEvent: IEvent;
    action: string;
    done: boolean;
    error: any;
}

export interface IEventEntityState extends EntityState<IEvent> { }
