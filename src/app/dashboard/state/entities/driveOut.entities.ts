import { DriveOutModel } from '../../models/driveOut.model';
import * as dashActions from '../actions/action.types';
import { createSelector } from '@ngrx/store';
import { driveOutStateKey } from '../dash.selectors';

export interface DriveOutState {
  next: string;
  loaded: boolean;
  selectedId: string;
  driveOut: DriveOutModel[];
}

const initialState: DriveOutState = {
  next: '',
  loaded: false,
  selectedId: '',
  driveOut: [],
};

export function driveOutReducer(
  state = initialState,
  action: any
): DriveOutState {
  switch (action.type) {
    case dashActions.DashActionTypes.LOAD_DRIVE_OUT:
      return {
        ...state,
      };
    case dashActions.DashActionTypes.LOAD_DRIVE_OUT_SUCCESS:
      return {
        ...state,
        loaded: true,
        next: action.payload.next,
        driveOut: action.payload.results,
      };
    default:
      return state;
  }
}

// Selectors
export const driveOutLoaded = createSelector(
  driveOutStateKey,
  (state) => state.loaded
);
export const driveOuts = createSelector(
  driveOutStateKey,
  (state) => state.driveOut
);
