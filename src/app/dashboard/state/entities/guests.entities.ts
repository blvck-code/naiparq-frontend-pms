import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { GuestsModel } from '../../models';
import * as dashActions from '../actions/action.types';
import { createSelector } from '@ngrx/store';
import { guestStateKey } from '../dash.selectors';

export interface GuestsEntities extends EntityState<GuestsModel> {
  loading: boolean;
  loaded: boolean;
  next: string;
}

export const guestsAdapter: EntityAdapter<GuestsModel> =
  createEntityAdapter<GuestsModel>();

export const defaultGuests: GuestsEntities = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  next: '',
};

export const initialState = guestsAdapter.getInitialState(defaultGuests);

export const guestsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case dashActions.DashActionTypes.LOAD_GUESTS:
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case dashActions.DashActionTypes.LOAD_GUESTS_SUCCESS:
      return guestsAdapter.addMany(action.payload.results, {
        ...state,
        loading: false,
        loaded: true,
      });
    default:
      return state;
  }
};

// Selectors

export const getGuests = createSelector(
  guestStateKey,
  guestsAdapter.getSelectors().selectAll
);

export const guestsLoading = createSelector(
  guestStateKey,
  (state) => state.loading
);

export const guestsLoaded = createSelector(
  guestStateKey,
  (state) => state.loaded
);
