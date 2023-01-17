import { DriveOutModel } from '../../models/driveOut.model';

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
    default:
      return state;
  }
}
