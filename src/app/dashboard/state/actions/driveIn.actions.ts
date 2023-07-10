import { Action } from '@ngrx/store';
import { DashActionTypes } from './action.types';
import { DriveInResponseModel } from '../../models/driveIn.model';
import { DriveOutResponseModel } from '../../models/driveOut.model';

export class LoadDriveIn implements Action {
  readonly type = DashActionTypes.LOAD_DRIVE_IN;
}

export class LoadDriveInSuccess implements Action {
  readonly type = DashActionTypes.LOAD_DRIVE_IN_SUCCESS;
  constructor(public payload: DriveInResponseModel) {}
}

// Pagination
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
  constructor(public payload: string) {
    console.log('Get more drive in error ===>>', payload);
  }
}

// Drive Out
export class LoadDriveOut implements Action {
  readonly type = DashActionTypes.LOAD_DRIVE_OUT;
  constructor() {}
}
export class LoadDriveOutSuccess implements Action {
  readonly type = DashActionTypes.LOAD_DRIVE_OUT_SUCCESS;
  constructor(public payload: any) {}
}
export class LoadDriveOutFail implements Action {
  readonly type = DashActionTypes.LOAD_DRIVE_OUT_FAIL;
  constructor(public payload: any) {
    console.log('Get drive out error ===>>>', payload);
  }
}
export class filterDriveOut implements Action {
  readonly type = DashActionTypes.FILTER_DRIVE_OUT;
  constructor(public payload: any) {}
}
export class filterDriveOutSuccess implements Action {
  readonly type = DashActionTypes.FILTER_DRIVE_OUT_SUCCESS;
  constructor(public payload: any) {}
}
