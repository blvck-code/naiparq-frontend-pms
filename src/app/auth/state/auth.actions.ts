import { Action } from '@ngrx/store';
import { LoginResponseModel } from '../model/login.model';
import { AuthState, initialState } from './auth.reducer';
import { RegisterModel, RegisterResponseModel } from '../model/register.model';
import { ProfileResponseModel } from '../model/profile.model';
import { TokenModel } from '../model/user.model';

export interface ActionExecutable<T> extends Action {
  execute: (state: T) => T;
}

export enum AuthActionsTypes {
  AUTO_LOGIN = 'userCenter/autoLogin',
  RESET_INVALID = 'userCenter/resetInvalid',

  // Log In
  LOGIN = 'userCenter/login',
  LOGIN_SUCCESS = 'userCenter/loginSuccess',
  LOGIN_FAIL = 'userCenter/loginFail',

  // Sign Up
  REGISTER = 'userCenter/register',
  REGISTER_SUCCESS = 'userCenter/registerSuccess',
  REGISTER_FAIL = 'useCenter/registerFail',

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

// Reset Form Invalid
export class ResetInvalid implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.RESET_INVALID;
  constructor() {}

  execute(state: AuthState) {
    return {
      ...state,
      loginStatus: {
        isLoading: false,
        isLoggedIn: false,
        invalid: false,
      },
    };
  }
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
        isLoggedIn: false,
        invalid: false,
      },
    };
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
        invalid: false,
      },
    };
  }
}
export class LogInFail implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.LOGIN_FAIL;
  constructor(public payload: string) {}

  execute(state: AuthState): AuthState {
    return {
      ...state,
      userInfo: {
        user: {
          id: '',
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
        },
        token: null,
        message: this.payload,
      },
      loginStatus: {
        isLoading: false,
        isLoggedIn: false,
        invalid: true,
      },
    };
  }
}

// Log Out
export class LogOut implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.LOGOUT;
  constructor() {}
  execute(state: AuthState): AuthState {
    return {
      ...state,
    };
  }
}
export class LogOutSuccess implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.LOGOUT_SUCCESS;
  constructor(public payload: { message: string }) {}
  execute(state: AuthState): AuthState {
    return (state = initialState);
  }
}
export class LogOutFail implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.LOGOUT_FAIL;
  constructor(public payload: string) {}
  execute(state: AuthState): AuthState {
    return {
      ...state,
    };
  }
}

// Sign Up
// Todo set up sign up with store
export class SignUp implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.REGISTER;
  constructor(public payload: RegisterModel) {}

  execute(state: AuthState): AuthState {
    return {
      ...state,
    };
  }
}
export class SignUpSuccess implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.REGISTER_SUCCESS;
  constructor(public payload: RegisterResponseModel) {}

  execute(state: AuthState): AuthState {
    return {
      ...state,
    };
  }
}
export class SignUpFail implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.REGISTER_FAIL;
  constructor(public payload: string) {}

  execute(state: AuthState): AuthState {
    return {
      ...state,
    };
  }
}

// Load Profile
export class LoadProfile implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.LOAD_PROFILE;
  constructor() {
    console.log('Getting profileeee');
  }

  execute(state: AuthState): AuthState {
    return {
      ...state,
    };
  }
}
export class LoadProfileSuccess implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.LOAD_PROFILE_SUCCESS;
  constructor(public payload: ProfileResponseModel) {
    console.log('User profile ===>>', payload);
  }

  execute(state: AuthState): AuthState {
    const userId = state.userInfo.user.id;
    const userDetails = this.payload.results.find((item) => item.id === userId);
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        // @ts-ignore
        user: userDetails,
      },
    };
  }
}
export class LoadProfileFail implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.LOAD_PROFILE_FAIL;
  constructor(public payload: any) {
    console.log('Failed to get profile ==>>>', payload);
  }

  execute(state: AuthState): AuthState {
    return {
      ...state,
    };
  }
}

// Refresh token
export class RefreshToken implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.REFRESH_TOKEN;
  constructor(public payload: any) {
    console.log('Token ===>>', payload);
  }

  execute(state: AuthState): AuthState {
    return {
      ...state,
    };
  }
}
export class RefreshTokenSuccess implements ActionExecutable<AuthState> {
  readonly type = AuthActionsTypes.REFRESH_TOKEN;
  constructor(public payload: TokenModel) {}

  execute(state: AuthState): AuthState {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        // token: {
        //   access: this.payload.access,
        //   refresh: this.payload.refresh
        // }
      },
    };
  }
}
export type AuthActions =
  // Log In
  | LogIn
  | LogInSuccess
  | LogInFail
  // Log Out
  | LogOut
  | LogOutSuccess
  | LogOutFail
  // Reset Invalid
  | ResetInvalid
  //
  | SignUp
  | SignUpSuccess
  | SignUpFail
  // Load profile
  | LoadProfile
  | LoadProfileSuccess
  | LoadProfileFail;

// export class SignUp implements ActionExecutable<AuthState> {
//   readonly type = AuthActionsTypes.REGISTER;
//   constructor(public payload: RegisterModel) {}
//
//   execute(state: AuthState): AuthState{
//     return {
//       ...state
//     }
//   }
// }
