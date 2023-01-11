import * as dashActions from '../actions/action.types';
import { createSelector } from '@ngrx/store';
import { driveInStateKey } from '../dash.selectors';
import { DriveInModel } from '../../models/driveIn.model';

export interface DriveInState {
  next: string;
  loaded: boolean;
  driveIn: DriveInModel[];
}

const initialState: DriveInState = {
  next: '',
  loaded: false,
  driveIn: [],
};

export function driveInReducer(
  state = initialState,
  action: any
): DriveInState {
  switch (action.type) {
    case dashActions.DashActionTypes.LOAD_DRIVE_IN_SUCCESS:
      return {
        next: action.payload.next,
        driveIn: action.payload.results,
        loaded: true,
      };
    case dashActions.DashActionTypes.LOAD_MORE_DRIVE_IN_SUCCESS:
      return {
        ...state,
        next: action.payload.next,
        driveIn: [...state.driveIn, ...action.payload.results],
      };
    default:
      return state;
  }
}

// Selectors
export const driveInLoaded = createSelector(
  driveInStateKey,
  (state) => state.loaded
);
export const driveIns = createSelector(
  driveInStateKey,
  (state) => state.driveIn
);
export const driveInNext = createSelector(
  driveInStateKey,
  (state) => state.next
);
