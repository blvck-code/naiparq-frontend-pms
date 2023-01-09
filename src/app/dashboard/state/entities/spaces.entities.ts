import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SpaceModel } from '../../models/spaces.model';

// Actions
import * as dashActions from '../actions/action.types';
import { createSelector } from '@ngrx/store';
import { spacesStateKey } from '../dash.reducer';

export interface SpacesEntities extends EntityState<SpaceModel> {
  selectedSpaceId: string;
  loading: boolean;
  loaded: boolean;
}

export const spacesAdapter: EntityAdapter<SpaceModel> =
  createEntityAdapter<SpaceModel>();

export const defaultSpace: SpacesEntities = {
  ids: [],
  entities: {},
  selectedSpaceId: '',
  loading: false,
  loaded: false,
};

export const initialState = spacesAdapter.getInitialState(defaultSpace);

export const spaceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case dashActions.DashActionTypes.LOAD_SPACES:
      return {
        ...state,
        loading: true,
      };
    case dashActions.DashActionTypes.LOAD_SPACES_SUCCESS:
      return spacesAdapter.addMany(action.payload.results, {
        ...state,
        loading: false,
        loaded: true,
      });
    default:
      return state;
  }
};

// Selectors
// export const getSpaces = createSelector(
//   spacesStateKey,
//   spacesAdapter.getSelectors().selectAll
// );
