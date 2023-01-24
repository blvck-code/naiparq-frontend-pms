import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../model/login.model';
import { SharedService } from '../../shared/services/shared.service';

// Actions
import * as authActions from './auth.actions';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterModel, RegisterResponseModel } from '../model/register.model';

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private authSrv: AuthService,
    private storage: StorageService,
    private sharedSrv: SharedService
  ) {}

  logIn$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<authActions.LogIn>(authActions.AuthActionsTypes.LOGIN),
      map((action: authActions.LogIn) => action.payload),
      switchMap((userCredentials: LoginModel) => {
        return this.authSrv.logIn(userCredentials).pipe(
          map((userInfo) => {
            // Setting localstorage
            this.storage.setToken(userInfo.token);
            this.storage.setUser(userInfo.user);

            this.sharedSrv.showNotification(
              `Welcome back ${userInfo.user.first_name} ${userInfo.user.last_name}`,
              'success'
            );
            return new authActions.LogInSuccess(userInfo);
          }),
          catchError((err: HttpErrorResponse) => {
            this.storage.clearToken();
            console.log('Login error ==>>', err);

            this.sharedSrv.showNotification(err.message, 'error');
            return of(new authActions.LogInFail(err.message));
          })
        );
      })
    );
  });

  loginRedirect$: Observable<Action> = createEffect(
    () => {
      return this.actions$.pipe(
        ofType<authActions.LogInSuccess>(
          authActions.AuthActionsTypes.LOGIN_SUCCESS
        ),
        tap((action: Action) => {
          this.router.navigate(['/dashboard']);
        })
      );
    },
    { dispatch: false }
  );

  logOut$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<authActions.LogOut>(authActions.AuthActionsTypes.LOGOUT),
      switchMap(() => {
        return this.authSrv.logOut().pipe(
          map((response: { message: string }) => {
            // Clear localstorage
            this.storage.clearToken();
            this.router.navigate(['/auth']);

            this.sharedSrv.showNotification(
              'We hope to see you again',
              'success'
            );
            return new authActions.LogOutSuccess(response);
          }),
          catchError((err: HttpErrorResponse) => {
            this.sharedSrv.showNotification(err.message, 'error');
            return of(new authActions.LogOutFail(err.message));
          })
        );
      })
    );
  });

  signUp$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<authActions.SignUp>(authActions.AuthActionsTypes.REGISTER),
      map((action: authActions.SignUp) => action.payload),
      switchMap((registerContent: RegisterModel) => {
        return this.authSrv.register(registerContent).pipe(
          map((resp: RegisterResponseModel) => {
            this.sharedSrv.showNotification(resp.message, 'success');
            return new authActions.SignUpSuccess(resp);
          }),
          catchError((err: HttpErrorResponse) => {
            this.sharedSrv.showNotification(err.message, 'error');
            this.storage.clearToken();
            return of(new authActions.SignUpFail(err.message));
          })
        );
      })
    );
  });

  loadProfile$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<authActions.LoadProfile>(
        authActions.AuthActionsTypes.LOAD_PROFILE
      ),
      switchMap((action: authActions.LoadProfile) => {
        return this.authSrv.loadProfile().pipe(
          map((profile) => new authActions.LoadProfileSuccess(profile)),
          catchError((err) => {
            this.sharedSrv.showNotification(
              'Failed to get your profile.',
              'error'
            );
            return of(new authActions.LoadProfileFail(err));
          })
        );
      })
    );
  });

  // refreshToken$: Observable<Action> = createEffect(() => {
  //   return this.actions$.pipe(ofType < authActions);
  // });
}
