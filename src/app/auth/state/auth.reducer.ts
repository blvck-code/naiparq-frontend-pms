import { TokenModel, UserModel } from '../model/user.model';
import * as authActions from './auth.actions';

export interface AuthState {
  /**
   * User details interface
   * @interface
   */
  userInfo: {
    user: UserModel;
    message: string;
    token: TokenModel | null;
  };
  /**
   *  Log In status interface
   *  @interface
   */
  loginStatus: {
    isLoading: boolean;
    isLoggedIn: boolean;
    invalid: boolean;
  };
  /**
   *  More user details content
   *  @interface
   */
  users: {
    loading: boolean;
    next?: string;
    results: UserModel[];
  };
}

export const initialState: AuthState = {
  userInfo: {
    user: {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
    },
    message: '',
    token: {
      expiry_time: '',
      lifetime: '',
      access: '',
      refresh: '',
    },
  },
  loginStatus: {
    isLoading: false,
    isLoggedIn: false,
    invalid: false,
  },
  users: {
    loading: false,
    next: '',
    results: [],
  },
};

export function authReducer(
  state: AuthState = initialState,
  action: authActions.AuthActions
): AuthState {
  if (!action.execute) {
    return state;
  }
  return action.execute(state);
}
