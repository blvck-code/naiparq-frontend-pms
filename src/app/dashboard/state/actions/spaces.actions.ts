import { Action } from '@ngrx/store';
import { DashActionTypes } from './action.types';
import { SpaceModelResponse } from '../../models/spaces.model';
import { OrganisationResponseModel } from '../../models/organisation.model';

// Load Spaces
export class LoadSpaces implements Action {
  readonly type = DashActionTypes.LOAD_SPACES;
}

export class LoadSpacesSuccess implements Action {
  readonly type = DashActionTypes.LOAD_SPACES_SUCCESS;
  constructor(public payload: SpaceModelResponse) {}
}

// Load Organizations
export class LoadOrganizations implements Action {
  readonly type = DashActionTypes.LOAD_ORGANIZATION;
}

export class LoadOrganizationsSuccess implements Action {
  readonly type = DashActionTypes.LOAD_ORGANIZATION_SUCCESS;
  constructor(public payload: OrganisationResponseModel) {}
}
