import { Action } from '@ngrx/store';
import { DashActionTypes } from './action.types';
import { DevicesResponseModel } from '../../models/devices.model';

export class LoadDevices implements Action {
  readonly type = DashActionTypes.LOAD_DEVICES;
}

export class LoadDevicesSuccess implements Action {
  readonly type = DashActionTypes.LOAD_DEVICES_SUCCESS;
  constructor(public payload: DevicesResponseModel) {
    console.log('Assets ==>>', payload);
  }
}
