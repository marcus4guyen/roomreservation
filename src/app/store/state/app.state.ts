import { IAppState } from '@myInterface/app.interface';

import { initialEventState } from './event.state';
import { initialLoaderState } from './loader.state';

export const initialAppState: IAppState = {
    events: initialEventState,
    loader: initialLoaderState
};

export function getInitialState(): IAppState {
    return initialAppState;
}
