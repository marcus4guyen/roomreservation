import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import * as _ from 'lodash';

import { IEvent } from '@myInterface/event.interface';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    endPoint = 'https://www.jsonstore.io/1eda1c7533d94ecc8a7afefece00ad8b539813a234b7e2beca7d3637a26389d2';

    constructor(private http: HttpClient, private _db: AngularFirestore) { }

    getAll(): Observable<IEvent[]> {
        // return this.http.get(this.endPoint).pipe(
        //     map(res => {
        //         const calendarEvents: IEvent[] = [];
        //         const events = res['result'] && res['result']['events'] ? res['result']['events'] : [];

        //         _.forEach(events, (value, key) => {
        //             calendarEvents.push(value);
        //         });

        //         return calendarEvents;
        //     })
        // );

        return this._db.collection('events').snapshotChanges().pipe(
            map(res => {
                const calendarEvents: IEvent[] = [];
                const events = res;

                _.forEach(events, (event, key) => {
                    const doc = event.payload.doc;
                    calendarEvents.push({
                        ...doc.data(),
                        __id: doc.id
                    });
                });

                return calendarEvents;
            })
        );
    }

    get(id: string): Observable<object> {
        // return this.http.get(`${this.endPoint}/events/${id}`);
        return of(this._db.collection('events').doc(id));
    }

    create(event: IEvent) {
        // return this.http.post(`${this.endPoint}/events/${event.id}`, event).pipe(
        //     map(res => res['ok'])
        // );
        return of(this._db.collection('events').add(event));
    }

    update(event: IEvent) {
        // return this.http.put(`${this.endPoint}/events/${event.id}`, event).pipe(
        //     map(res => res['ok'])
        // );
        return of(this._db.collection('events').doc(event.__id).update(event));
    }

    delete(event: IEvent) {
        // return this.http.delete(`${this.endPoint}/events/${event.id}`).pipe(
        //     map(res => res['ok'])
        // );
        return of(this._db.collection('events').doc(event.__id).delete());
    }
}
