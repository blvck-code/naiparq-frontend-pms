import { CompanyModel } from '../../model/company.model';
import * as homeActions from '../home.actions';

export interface CompanyState {
  loaded: boolean;
  companies: CompanyModel[];
  error: string;
}

const initialState: CompanyState = {
  loaded: false,
  companies: [],
  error: '',
};

export const companyEntity = (state = initialState, action: any) => {
  switch (action.type) {
    case homeActions.HomeActionsTypes.LOAD_FIRMS:
      return {
        ...state,
        loaded: false,
      };
    case homeActions.HomeActionsTypes.LOAD_FIRMS_SUCCESS:
      return {
        ...state,
        loaded: true,
        companies: action.payload.results,
      };
    case homeActions.HomeActionsTypes.LOAD_FIRMS_FAIL:
      return {
        ...state,
        loaded: false,
        companies: [],
        error: 'Failed to load firms',
      };
    default:
      return state;
  }
};
