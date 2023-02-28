import { OrganisationModel } from '../../models/organisation.model';
import * as dashActions from '../actions/action.types';

export interface OrganizationsState {
  next: string;
  loaded: boolean;
  orgs: OrganisationModel[];
}

const initialState: OrganizationsState = {
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
        next: action.payload.next,
        loaded: true,
        orgs: action.payload.results,
      };
    default:
      return state;
  }
}
