import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BillingModel } from '../../models/billing.model';
import * as dashActions from '../actions/action.types';
import { createSelector } from '@ngrx/store';
import { billingStateKey } from '../dash.selectors';

export interface BillingEntities extends EntityState<BillingModel> {
  selectedBilling: string;
  loading: boolean;
  loaded: boolean;
  next: string;
}

export const billingAdapter: EntityAdapter<BillingModel> =
  createEntityAdapter<BillingModel>();

export const defaultBilling: BillingEntities = {
  ids: [],
  entities: {},
  selectedBilling: '',
  loading: false,
  loaded: false,
  next: '',
};

export const initialState = billingAdapter.getInitialState(defaultBilling);

export const billingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case dashActions.DashActionTypes.LOAD_BILLINGS:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case dashActions.DashActionTypes.LOAD_BILLINGS_SUCCESS:
      return billingAdapter.addMany(action.payload.results, {
        ...state,
        loading: false,
        loaded: true,
        next: action.payload.next,
      });
    default:
      return state;
  }
};

// Selectors
export const getBillings = createSelector(
  billingStateKey,
  billingAdapter.getSelectors().selectAll
);
export const billingsLoading = createSelector(
  billingStateKey,
  (state) => state.loading
);
export const billingsLoaded = createSelector(
  billingStateKey,
  (state) => state.loaded
);
export const totalRevenue = createSelector(getBillings, (bills) =>
  bills.reduce(
    (partialSum: number, revenue: BillingModel) =>
      partialSum + parseInt(String(revenue.total_amount)),
    0
  )
);
