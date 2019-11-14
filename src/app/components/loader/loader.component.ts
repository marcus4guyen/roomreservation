import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { IAppState } from '@myApp/interface/app.interface';
import { selectIsLoading } from '@myStore/selectors/loader.selectors';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

    isLoading$: Observable<boolean> = this._store.pipe(select(selectIsLoading));

    constructor(private _store: Store<IAppState>) { }
}
