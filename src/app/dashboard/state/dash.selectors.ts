import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dash.reducer';

export const dashboard = 'dashboard';

export const dashboardStateKey =
  createFeatureSelector<DashboardState>(dashboard);

export const spacesStateKey = createSelector(
  dashboardStateKey,
  (state) => state.spaces
);

export const driveInStateKey = createSelector(
  dashboardStateKey,
  (state) => state.driveIn
);

export const driveOutStateKey = createSelector(
  dashboardStateKey,
  (state) => state.driveOut
);

export const devicesStateKey = createSelector(
  dashboardStateKey,
  (state) => state.devices
);
