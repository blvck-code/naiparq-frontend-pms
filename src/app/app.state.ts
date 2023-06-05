import * as fromAuth from './auth/state/auth.reducer';

/**
 *  Interface for AppState content
 *
 *  @interface
 */
export interface AppState {
  userCenter: fromAuth.AuthState;
}
