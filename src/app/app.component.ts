import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import { Observable } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment';

import { IEvent } from '@myInterface/event.interface';
import { IAppState } from '@myInterface/app.interface';
import { EventDialogComponent } from '@myComponents/event-dialog/event-dialog.component';
import { MessageDialogComponent } from '@myComponents/message-dialog/message-dialog.component';
import { GLOBAL } from './global';

import {
    GetEvents,
    AddEvent,
    UpdateEvent,
    CancelEvent
} from '@myStore/actions/event.actions';
import {
    selectEventList,
    selectGetEventsError,
    selectAddEventError,
    selectUpdateEventError,
    selectCancelEventError
} from '@myStore/selectors/event.selectors';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'room-reservation';
    calendarPlugins = [ dayGridPlugin, timeGridPlugin, listPlugin, bootstrapPlugin, interactionPlugin ];

    calendarEvents: IEvent[] = [];
    calendarEvents$: Observable<IEvent[]> = this._store.pipe(select(selectEventList));
    scrollTime: string = moment().format(GLOBAL.FORMAT.HH_mm);

    constructor(private _matDialog: MatDialog,
                private _store: Store<IAppState>) { }

    ngOnInit(): void {
        this._store.dispatch(new GetEvents());

        this._store.pipe(select(selectGetEventsError)).subscribe((err) => {
            if (err) {
                this._matDialog.open(MessageDialogComponent, {
                    data: 'Something went wrong with the server.'
                });
            }
        });
        this._store.pipe(select(selectAddEventError)).subscribe((err) => {
            if (err) {
                this._matDialog.open(MessageDialogComponent, {
                    data: 'Something went wrong. You cant book the room.'
                });
            }
        });
        this._store.pipe(select(selectUpdateEventError)).subscribe((err) => {
            if (err) {
                this._matDialog.open(MessageDialogComponent, {
                    data: 'Something went wrong. You cant update the room info.'
                });
            }
        });
        this._store.pipe(select(selectCancelEventError)).subscribe((err) => {
            if (err) {
                this._matDialog.open(MessageDialogComponent, {
                    data: 'Something went wrong. You cant cancel the room.'
                });
            }
        });

        this.calendarEvents$.subscribe(events => this.calendarEvents = events);
    }

    public onDateClick(dateClickInfo): void {
        this.onOpenDialog(dateClickInfo);
    }

    public onEventClick(eventClickInfo): void {
        this.onOpenDialog(eventClickInfo);
    }

    private onOpenDialog(eventData): void {
        const dialogRef = this._matDialog.open(EventDialogComponent, {
            data: eventData
        });

        dialogRef.afterClosed().subscribe(newEvent => {
            if (!newEvent.outsideClicked) {
                switch (newEvent.mode) {
                    case GLOBAL.EVENT_MODE.NEW: {
                        if (!this.checkForDuplicate(this.calendarEvents, newEvent.data)) {
                            this._store.dispatch(new AddEvent(newEvent.data));
                        } else {
                            this._matDialog.open(MessageDialogComponent, {
                                data: 'Someone has booked the room in advance in your time. Please negotiate with them.'
                            });
                        }

                        break;
                    }

                    case GLOBAL.EVENT_MODE.UPDATE: {
                        if (!this.checkForDuplicate(this.calendarEvents, newEvent.data)) {
                            this._store.dispatch(new UpdateEvent(newEvent.data));
                        } else {
                            this._matDialog.open(MessageDialogComponent, {
                                data: 'Someone has booked the room in advance in your time. Please negotiate with them.'
                            });
                        }

                        break;
                    }

                    case GLOBAL.EVENT_MODE.DELETE: {
                        this._store.dispatch(new CancelEvent(newEvent.data));
                        break;
                    }
                }
            }
        });
    }

    /**************************
    ******** PRIVATE *********
    **************************/
    checkForDuplicate(events: IEvent[], newEvent: IEvent): boolean {
        let isDuplicated = false;

        _.forEach(events, (event: IEvent, key) => {
            const startTime = moment(event.start);
            const endTime = moment(event.end);

            const newStartTime = moment(newEvent.start);
            const newEndTime = moment(newEvent.end);

            if (event.id === newEvent.id ||
                (newStartTime.isBefore(startTime) && newEndTime.isSameOrBefore(startTime)) ||
                (newStartTime.isSameOrAfter(endTime) && newEndTime.isAfter(endTime))) {
                    isDuplicated = false;
            } else {
                isDuplicated = true;
                return false; // to finish lodash#foreach
            }
        });

        return isDuplicated;
    }
}
