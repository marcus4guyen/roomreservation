import { Component, OnInit, Inject, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';
import * as uuid from 'uuid';
import * as _ from 'lodash';

import { GLOBAL } from '@myApp/global';
import { IEvent, IEventMode } from '@myInterface/event.interface';
import { generateTimesInterval } from '@myHelper/timepicker';

@Component({
    selector: 'app-event-dialog',
    templateUrl: './event-dialog.component.html',
    styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit, OnDestroy {
    eventForm: FormGroup;
    isOutsideClicked = true;
    mode: string;
    EVENT_MODE: IEventMode = GLOBAL.EVENT_MODE;

    timesInterval: Array<string>;
    startTimesInterval: Array<string>;
    endTimesInterval: Array<string>;

    constructor(private _formBuilder: FormBuilder,
                private _dialogRef: MatDialogRef<EventDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public eventData) { }

    ngOnInit() {
        this.mode = this.eventData.event ? this.EVENT_MODE.UPDATE : this.EVENT_MODE.NEW;
        this.timesInterval = generateTimesInterval(8, 16, 15);
        this.startTimesInterval = generateTimesInterval(8, 16, 15);
        this.endTimesInterval = generateTimesInterval(8, 16, 15);

        // update mode
        if (this.mode === this.EVENT_MODE.UPDATE) {
            this.eventForm = this._formBuilder.group({
                purpose: [this.eventData.event.title],
                date: [{ value: moment(this.eventData.event.start).format(GLOBAL.FORMAT.DD_MM_YYYY), disabled: true }],
                start: [moment(this.eventData.event.start).format(GLOBAL.FORMAT.HH_mm)],
                end: [moment(this.eventData.event.end).format(GLOBAL.FORMAT.HH_mm)]
            });
        } else if (this.mode === this.EVENT_MODE.NEW) { // new mode
            this.eventForm = this._formBuilder.group({
                purpose: ['', Validators.required ],
                date: [{ value: moment(this.eventData.date).format(GLOBAL.FORMAT.DD_MM_YYYY), disabled: true }],
                start: [this.eventData.allDay ? '' : moment(this.eventData.date).format(GLOBAL.FORMAT.HH_mm), Validators.required],
                end: ['', Validators.required]
            });

            if (this.eventForm.get('start').value) {
                this.endTimesInterval = this.getEndTimesIntervalFromStartTime(this.eventForm.get('start').value);
            }

            if (this.eventForm.get('end').value) {
                this.startTimesInterval = this.getStartTimesIntervalFromEndTime(this.eventForm.get('end').value);
            }
        }

        this.eventForm.get('start').valueChanges.subscribe((newStartTime) => {
            this.endTimesInterval = _.clone(this.timesInterval);

            if (newStartTime) {
                this.endTimesInterval = this.getEndTimesIntervalFromStartTime(newStartTime);
            }
        });

        this.eventForm.get('end').valueChanges.subscribe((newEndTime) => {
            this.startTimesInterval = _.clone(this.timesInterval);

            if (newEndTime) {
                this.startTimesInterval = this.getStartTimesIntervalFromEndTime(newEndTime);
            }
        });
    }

    private get inputData(): IEvent {
        const date = this.eventData.event ? moment(this.eventData.event.start) : moment(this.eventData.date);
        const startDate = date.clone();
        const endDate = date.clone();
        const startHour = this.eventForm.get('start').value ? this.eventForm.get('start').value.split(':')[0] : '';
        const startMinute = this.eventForm.get('start').value ? this.eventForm.get('start').value.split(':')[1] : '';
        const endHour = this.eventForm.get('end').value ? this.eventForm.get('end').value.split(':')[0] : '';
        const endMinute = this.eventForm.get('end').value ? this.eventForm.get('end').value.split(':')[1] : '';

        startDate.hour(startHour);
        startDate.minute(startMinute);
        endDate.hour(endHour);
        endDate.minute(endMinute);

        return {
            __id: this.eventData.event ? this.eventData.event.extendedProps.__id : '', // firebase
            id: this.eventData.event ? this.eventData.event.id : uuid(),
            title: this.eventForm.get('purpose').value,
            start: startDate.valueOf(),
            end: endDate.valueOf()
        };
    }

    private getStartTimesIntervalFromEndTime(endTime: string): Array<string> {
        const startTimeIndex = this.startTimesInterval.indexOf(endTime);
        return this.startTimesInterval.slice(0, startTimeIndex);
    }

    private getEndTimesIntervalFromStartTime(startTime: string): Array<string> {
        const endTimeIndex = this.endTimesInterval.indexOf(startTime);
        return this.endTimesInterval.slice(endTimeIndex + 1);
    }

    ngOnDestroy(): void {
        this._dialogRef.close({
            mode: this.mode,
            data: this.inputData,
            outsideClicked: this.isOutsideClicked
        });
    }

    public onBookClicked(): void {
        if (this.eventForm.valid) {
            this.isOutsideClicked = false;
            this._dialogRef.close();
        }
    }

    public onDeleteClicked(): void {
        this.mode = this.EVENT_MODE.DELETE;
        this.isOutsideClicked = false;
        this._dialogRef.close();
    }
}
