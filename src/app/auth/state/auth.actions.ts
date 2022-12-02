import {Action} from "@ngrx/store";
import {LoginResponseModel} from "../model/login.model";
import {AuthState, initialState} from "./auth.reducer";

export interface ActionExecutable<T> extends Action {
  execute: (state: T) => T;
}

export enum AuthActionsTypes {
  AUTO_LOGIN = 'userCenter/autoLogin',

  // Log In
  LOGIN = 'userCenter/login',
  LOGIN_SUCCESS = 'userCenter/loginSuccess',
  LOGIN_FAIL = 'userCenter/loginFail',

  // Refresh Token
  REFRESH_TOKEN = 'userCenter/refreshToken',
  REFRESH_TOKEN_SUCCESS = 'userCenter/refreshTokenSuccess',
  REFRESH_TOKEN_FAIL = 'userCenter/refreshTokenFail',

  // Profile
  LOAD_PROFILE = 'userCenter/loadProfile',
  LOAD_PROFILE_SUCCESS = 'userCenter/loadProfileSuccess',
  LOAD_PROFILE_FAIL = 'userCenter/loadProfileFail',

  // Profile
  UPDATE_PROFILE = 'userCenter/updateProfile',
  UPDATE_PROFILE_SUCCESS = 'userCenter/updateProfileSuccess',
  UPDATE_PROFILE_FAIL = 'userCenter/updateProfileFail',

  // Log out
  LOGOUT = 'userCenter/logout',
  LOGOUT_SUCCESS = 'userCenter/logoutSuccess',
  LOGOUT_FAIL = 'userCenter/logoutFail',
}

// Log In
export class LogIn implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.LOGIN;
  constructor(public payload: any) {}

  execute(state: AuthState): AuthState {
    return {
      ...state,
      loginStatus: {
        isLoading: true,
        isLoggedIn: false
      }
    }
  }
}
export class LogInSuccess implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.LOGIN_SUCCESS;
  constructor(public payload: LoginResponseModel) {}

  execute(state: AuthState): AuthState {
    return {
      ...state,
      userInfo: this.payload,
      loginStatus: {
        isLoading: false,
        isLoggedIn: true,
      },
    }
  }
}
export class LogInFail implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.LOGIN_FAIL;
  constructor(public payload: string) {}

  execute(state: AuthState): AuthState {
    return {
      ...state,
      userInfo: {
        user: null,
        token: null,
        message: this.payload
      },
      loginStatus: {
        isLoading: false,
        isLoggedIn: false,
      },
    }
  }
}

// Log Out
export class LogOut implements ActionExecutable<AuthState>{
  readonly type = AuthActionsTypes.LOGOUT;
  constructor() {}
  execute(state: AuthState): AuthState {
    return {
      ...state
    }
  }
}
export class LogOutSuccess implements ActionExecutable<AuthState>{
  readonly type = AuthActionsTypes.LOGOUT_SUCCESS;
  constructor(public payload: { message: string }) {}
  execute(state: AuthState): AuthState {
    return state = initialState
  }
}
export class LogOutFail implements ActionExecutable<AuthState>{
  readonly type = AuthActionsTypes.LOGOUT_FAIL;
  constructor(public payload: string) {}
  execute(state: AuthState): AuthState {
    return {
      ...state
    }
  }
}

export type AuthActions =
  // Log In
    LogIn
  | LogInSuccess
  | LogInFail
  // Log Out
  | LogOut
  | LogOutSuccess
  | LogOutFail;
