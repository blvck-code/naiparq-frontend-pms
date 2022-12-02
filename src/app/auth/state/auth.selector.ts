import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth.reducer";

export const authSelector = 'userCenter';

const getAuthState = createFeatureSelector<AuthState>(authSelector);


export const authMessage = createSelector(
  getAuthState,
  state => state.userInfo.message
);
export const isLoggedIn = createSelector(
  getAuthState,
  state => state.loginStatus.isLoggedIn
)
export const isLoggedInLoading = createSelector(
  getAuthState,
  state => state.loginStatus.isLoading
)
export const userToken = createSelector(
  getAuthState,
  state => state.userInfo.token
)
