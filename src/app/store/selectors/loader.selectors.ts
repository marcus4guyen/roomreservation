import { createSelector } from '@ngrx/store';

import { ILoaderState } from '@myInterface/loader.interface';
import { IAppState } from '@myInterface/app.interface';

const selectLoader = (state: IAppState) => state.loader;

export const selectIsLoading = createSelector(selectLoader, (state: ILoaderState) => state.isLoading);
