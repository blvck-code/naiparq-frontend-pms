import { OrganisationModel } from '../../models/organisation.model';
import * as dashActions from '../actions/action.types';
import { createSelector } from '@ngrx/store';
import { orgStateKey } from '../dash.selectors';

export interface OrganizationsState {
  spaceId: string;
  next: string;
  loaded: boolean;
  orgs: OrganisationModel[];
}

const initialState: OrganizationsState = {
  spaceId: '',
  next: '',
  loaded: false,
  orgs: [],
};

export function organizationReducer(
  state = initialState,
  action: any
): OrganizationsState {
  switch (action.type) {
    case dashActions.DashActionTypes.LOAD_ORGANIZATION:
      return {
        ...state,
        loaded: false,
      };
    case dashActions.DashActionTypes.LOAD_ORGANIZATION_SUCCESS:
      return {
        ...state,
        next: action.payload.next,
        loaded: true,
        orgs: action.payload.results,
      };
    case dashActions.DashActionTypes.SELECTED_SPACE_ID:
      return {
        ...state,
        spaceId: action.payload,
      };
    default:
      return state;
  }
}

// Selectors
export const organizationsLoaded = createSelector(
  orgStateKey,
  (state) => state.loaded
);
export const organizationsList = createSelector(
  orgStateKey,
  (state) => state.orgs
);
export const selectedSpaceId = createSelector(
  orgStateKey,
  (state) => state.spaceId
);

export const selectedSpaceOrgs = createSelector(
  organizationsList,
  selectedSpaceId,
  (orgs, spaceId) => orgs.filter((org) => org.space === spaceId)
);
