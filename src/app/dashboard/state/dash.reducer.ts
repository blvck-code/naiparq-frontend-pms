import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromSpaceEnt from './entities/spaces.entities';
import { spaceReducer } from './entities/spaces.entities';

export interface DashboardState {
  spaces: fromSpaceEnt.SpacesEntities;
}

export const dashboardReducer: ActionReducerMap<DashboardState> = {
  spaces: fromSpaceEnt.spaceReducer,
};

// Selectors
export const dashboard = 'dashboard';

export const dashboardStateKey =
  createFeatureSelector<DashboardState>(dashboard);

export const spacesStateKey = createSelector(
  dashboardStateKey,
  (state) => state.spaces
);
