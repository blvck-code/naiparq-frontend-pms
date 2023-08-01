import { DashActionTypes } from './action.types';
import { Action } from '@ngrx/store';
import { GuestsModelResponse } from '../../models/guests.model';

export class LoadGuests implements Action {
  readonly type = DashActionTypes.LOAD_GUESTS;
}

export class LoadGuestSuccess implements Action {
  readonly type = DashActionTypes.LOAD_GUESTS_SUCCESS;
  constructor(public payload: GuestsModelResponse) {
    console.log('Guests ==>>', payload);
  }
}

export class LoadGuestsFail implements Action {
  readonly type = DashActionTypes.LOAD_GUESTS_FAIL;
  constructor(public payload: any) {
    console.error('Failed load guests ==>>', payload);
  }
}
