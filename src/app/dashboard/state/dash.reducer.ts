import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromSpaceEnt from './entities/spaces.entities';
import * as fromDriveIn from './entities/driveIn.entities';

export interface DashboardState {
  spaces: fromSpaceEnt.SpacesEntities;
  driveIn: fromDriveIn.DriveInState;
}

export const dashboardReducer: ActionReducerMap<DashboardState> = {
  spaces: fromSpaceEnt.spaceReducer,
  driveIn: fromDriveIn.driveInReducer,
};
