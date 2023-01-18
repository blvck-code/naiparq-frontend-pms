import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromSpaceEnt from './entities/spaces.entities';
import * as fromDriveIn from './entities/driveIn.entities';
import * as fromDriveOut from './entities/driveOut.entities';

export interface DashboardState {
  spaces: fromSpaceEnt.SpacesEntities;
  driveIn: fromDriveIn.DriveInState;
  driveOut: fromDriveOut.DriveOutState;
}

export const dashboardReducer: ActionReducerMap<DashboardState> = {
  spaces: fromSpaceEnt.spaceReducer,
  driveIn: fromDriveIn.driveInReducer,
  driveOut: fromDriveOut.driveOutReducer,
};
