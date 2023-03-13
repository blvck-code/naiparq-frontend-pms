import { Action } from '@ngrx/store';
import { DashActionTypes } from './action.types';
import { BillingResponseModel } from '../../models/billing.model';

export class LoadBillings implements Action {
  readonly type = DashActionTypes.LOAD_BILLINGS;
}

export class LoadBillingsSuccess implements Action {
  readonly type = DashActionTypes.LOAD_BILLINGS_SUCCESS;
  constructor(public payload: BillingResponseModel) {}
}

export class LoadBillingsFail implements Action {
  readonly type = DashActionTypes.LOAD_BILLINGS_FAIL;
  constructor(public payload: any) {
    console.log('Load billings failed ===>>', payload);
  }
}
