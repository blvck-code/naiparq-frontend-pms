import * as fromAuth from './auth/state/auth.reducer';

export interface AppState {
  userCenter: fromAuth.AuthState;
}
