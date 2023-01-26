import { DevicesModel } from '../../models/devices.model';
import * as dashActions from '../actions/action.types';
import { createSelector } from '@ngrx/store';
import { devicesStateKey } from '../dash.selectors';

export interface DevicesState {
  next: string;
  loaded: boolean;
  devices: DevicesModel[];
}

const initialState: DevicesState = {
  next: '',
  loaded: false,
  devices: [],
};

export function driveOutReducer(
  state = initialState,
  action: any
): DevicesState {
  switch (action.type) {
    case dashActions.DashActionTypes.LOAD_DEVICES:
      return {
        loaded: false,
        next: '',
        devices: [],
      };
    case dashActions.DashActionTypes.LOAD_DEVICES_SUCCESS:
      return {
        next: action.payload.next,
        loaded: true,
        devices: action.payload.results,
      };
    default:
      return state;
  }
}

// Selectors
export const devicesLoaded = createSelector(
  devicesStateKey,
  (state) => state.loaded
);
export const devices = createSelector(
  devicesStateKey,
  (state) => state.devices
);
export const devicesNextLink = createSelector(
  devicesStateKey,
  (state) => state.next
);
