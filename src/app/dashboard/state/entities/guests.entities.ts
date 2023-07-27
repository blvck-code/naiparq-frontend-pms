import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { GuestsModel } from '../../models/guests.model';

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
    default:
      return state;
  }
};
