import { Action } from '@ngrx/store';
import { DashActionTypes } from './action.types';
import { DriveInResponseModel } from '../../models/driveIn.model';

export class LoadDriveIn implements Action {
  readonly type = DashActionTypes.LOAD_DRIVE_IN;
}

export class LoadDriveInSuccess implements Action {
  readonly type = DashActionTypes.LOAD_DRIVE_IN_SUCCESS;
  constructor(public payload: DriveInResponseModel) {}
}

export class LoadMoreDriveIn implements Action {
  readonly type = DashActionTypes.LOAD_MORE_DRIVE_IN;
  constructor(public payload: string) {}
}

export class LoadMoreDriveInSuccess implements Action {
  readonly type = DashActionTypes.LOAD_MORE_DRIVE_IN_SUCCESS;
  constructor(public payload: DriveInResponseModel) {}
}

export class LoadMoreDriveInFail implements Action {
  readonly type = DashActionTypes.LOAD_MORE_DRIVE_IN_FAIL;
  constructor(public payload: string) {}
}
