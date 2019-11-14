import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import {
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressBarModule
} from '@angular/material';
import { FullCalendarModule } from '@fullcalendar/angular';

import { AppComponent } from './app.component';
import { EventService } from '@myServices/event.service';
import { MessageDialogComponent } from '@myComponents/message-dialog/message-dialog.component';
import { EventDialogComponent } from '@myComponents/event-dialog/event-dialog.component';
import { LoaderComponent } from '@myComponents/loader/loader.component';

import { appReducers } from '@myStore/reducers/app.reducers';
import { EventEffects } from '@myStore/effects/event.effects';
import { LoaderEffects } from '@myStore/effects/loader.effects';

@NgModule({
    declarations: [
        AppComponent,
        EventDialogComponent,
        MessageDialogComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,

        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([EventEffects, LoaderEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),

        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,

        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButtonModule,
        MatSelectModule,
        MatProgressBarModule,

        FullCalendarModule
    ],
    providers: [
        EventService
    ],
    entryComponents: [
        EventDialogComponent,
        MessageDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
