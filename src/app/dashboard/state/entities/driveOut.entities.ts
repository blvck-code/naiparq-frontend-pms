import { DriveOutModel } from '../../models/driveOut.model';
import * as dashActions from '../actions/action.types';

export interface DriveOutState {
  next: string;
  loaded: boolean;
  driveOut: DriveOutModel[];
}

const initialState: DriveOutState = {
  next: '',
  loaded: false,
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
