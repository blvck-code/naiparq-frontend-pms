import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const authSelector = 'userCenter';

const getAuthState = createFeatureSelector<AuthState>(authSelector);

export const authMessage = createSelector(
  getAuthState,
  (state) => state.userInfo.message
);
export const isLoggedIn = createSelector(
  getAuthState,
  (state) => state.loginStatus.isLoggedIn
);
export const isLoggedInLoading = createSelector(
  getAuthState,
  (state) => state.loginStatus.isLoading
);
export const isInvalid = createSelector(
  getAuthState,
  (state) => state.loginStatus.invalid
);
export const userToken = createSelector(
  getAuthState,
  (state) => state.userInfo.token
);
export const userName = createSelector(
  getAuthState,
  (state) =>
    `${state.userInfo.user?.first_name.toUpperCase()}  ${state.userInfo.user?.last_name.toUpperCase()}`
);
export const userId = createSelector(
  getAuthState,
  (state) => state.userInfo.user.id
);
export const userInfo = createSelector(
  getAuthState,
  (state) => state.userInfo.user
);

export const blogger = createSelector(
  getAuthState,
  (state) => state.userInfo.user.user_type === 'blogger'
);

export const isSuperAdmin = createSelector(
  getAuthState,
  (state) => state.userInfo.user.is_superuser
);

export const usersLoading = createSelector(
  getAuthState,
  (state) => state.users.loading
);
export const allUsers = createSelector(
  getAuthState,
  (state) => state.users.results
);
