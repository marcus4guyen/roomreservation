import { ILoaderState } from '@myInterface/loader.interface';
import { initialLoaderState } from '@myStore/state/loader.state';
import { ELoaderActions, LoaderActions } from '@myStore/actions/loader.actions';

import * as _ from 'lodash';

export function loaderReducer(state = initialLoaderState, action: LoaderActions): ILoaderState {
    switch (action.type) {
        case ELoaderActions.ShowLoader: {
            return {
                ...state,
                isLoading: true
            };
        }

        case ELoaderActions.HideLoader: {
            return {
                ...state,
                isLoading: false
            };
        }

        default:
            return state;
    }
}
