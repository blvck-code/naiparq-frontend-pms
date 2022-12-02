import {Injectable} from "@angular/core";
import {catchError, map, Observable, of, switchMap, tap} from "rxjs";
import {Action} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../services/auth.service";
import {LoginModel} from "../model/login.model";
import {SharedService} from "../../shared/services/shared.service";

// Actions
import * as authActions from './auth.actions';
import {Router} from "@angular/router";
import {StorageService} from "../../shared/services/storage.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()

export class AuthEffects {

  constructor(
    private router: Router,
    private actions$: Actions,
    private authSrv: AuthService,
    private storage: StorageService,
    private sharedSrv: SharedService,
  ) {
  }

  handleError = (err: HttpErrorResponse): string => {
    let errMsg: string;
    console.log('Auth Error ==>>>', err);

    if (err.error.email) {
      errMsg = err.error.email.toString();
    } else if (err.error['non_field_errors'][0]) {
      errMsg = err.error['non_field_errors'][0];
    } else {
      errMsg = 'Invalid login credentials.';
    }
    return errMsg
  }

  logIn$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<authActions.LogIn>(
        authActions.AuthActionsTypes.LOGIN
      ),
      map((action: authActions.LogIn) => action.payload),
      switchMap((userCredentials: LoginModel) => {
        return this.authSrv.logIn(userCredentials).pipe(
          map(
            (userInfo) => {
              this.storage.setToken(userInfo.token);
              this.storage.setUser(userInfo.user);

              this.sharedSrv.showNotification('Logged in successfully', 'success');
              return new authActions.LogInSuccess(userInfo)
            }
          ),
          catchError((err: HttpErrorResponse) => {
            this.sharedSrv.showNotification(this.handleError(err), 'error');
            return of(new authActions.LogInFail(this.handleError(err)))
          })
        )
      })
    )
  });

  loginRedirect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<authActions.LogInSuccess>(
        authActions.AuthActionsTypes.LOGIN_SUCCESS
      ),
      tap((action) => {
        this.router.navigate(['/dashboard'])
      })
    )
  }, { dispatch: false });

  logOut$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<authActions.LogOut>(
        authActions.AuthActionsTypes.LOGOUT
      ),
      switchMap(() => {
        return this.authSrv.logOut().pipe(
          map(
            (response: { message: string }) => {
              this.sharedSrv.showNotification('Logged out successfully', 'success')
              return new authActions.LogOutSuccess(response)
            }
          ),
          catchError((err: HttpErrorResponse) => {
            this.sharedSrv.showNotification('Logout failed', 'error')
            return of(new authActions.LogOutFail(this.handleError(err)))
          })
        )
      })
    )
  });

}
