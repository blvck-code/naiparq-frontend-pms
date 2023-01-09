import { Action } from '@ngrx/store';
import { DashActionTypes } from './action.types';
import { SpaceModelResponse } from '../../models/spaces.model';

// Load Spaces
export class LoadSpaces implements Action {
  readonly type = DashActionTypes.LOAD_SPACES;
}

export class LoadSpacesSuccess implements Action {
  readonly type = DashActionTypes.LOAD_SPACES_SUCCESS;
  constructor(public payload: SpaceModelResponse) {}
}
