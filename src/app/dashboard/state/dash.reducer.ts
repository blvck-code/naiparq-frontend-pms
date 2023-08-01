import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import {
  fromSpaceEnt,
  fromDriveIn,
  fromDriveOut,
  fromDevices,
  fromOrg,
  fromBilling,
  guestsEnt,
} from './entities';
import { guestsReducer } from './entities/guests.entities';

export interface DashboardState {
  spaces: fromSpaceEnt.SpacesEntities;
  organizations: fromOrg.OrganizationsState;
  guests: guestsEnt.GuestsEntities;
  driveIn: fromDriveIn.DriveInState;
  driveOut: fromDriveOut.DriveOutState;
  billing: fromBilling.BillingEntities;
  devices: fromDevices.DevicesState;
}

export const dashboardReducer: ActionReducerMap<DashboardState> = {
  spaces: fromSpaceEnt.spaceReducer,
  organizations: fromOrg.organizationReducer,
  guests: guestsEnt.guestsReducer,
  driveIn: fromDriveIn.driveInReducer,
  driveOut: fromDriveOut.driveOutReducer,
  billing: fromBilling.billingReducer,
  devices: fromDevices.driveOutReducer,
};
