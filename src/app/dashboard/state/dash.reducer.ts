import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromSpaceEnt from './entities/spaces.entities';
import * as fromDriveIn from './entities/driveIn.entities';
import * as fromDriveOut from './entities/driveOut.entities';
import * as fromDevices from './entities/devices.entities';
import * as fromOrg from './entities/organizations.entities';

export interface DashboardState {
  spaces: fromSpaceEnt.SpacesEntities;
  organizations: fromOrg.OrganizationsState;
  driveIn: fromDriveIn.DriveInState;
  driveOut: fromDriveOut.DriveOutState;
  devices: fromDevices.DevicesState;
}

export const dashboardReducer: ActionReducerMap<DashboardState> = {
  spaces: fromSpaceEnt.spaceReducer,
  organizations: fromOrg.organizationReducer,
  driveIn: fromDriveIn.driveInReducer,
  driveOut: fromDriveOut.driveOutReducer,
  devices: fromDevices.driveOutReducer,
};
