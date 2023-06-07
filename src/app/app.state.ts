import * as fromAuth from './auth/state/auth.reducer';

/**
 *  Interface for AppState content
 *
 *  @interface
 */
export interface AppState {
  /**
   *  User details on the store set up
   */
  userCenter: fromAuth.AuthState;
}
