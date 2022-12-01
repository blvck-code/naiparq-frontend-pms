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

@Injectable()

export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authSrv: AuthService,
    private sharedSrv: SharedService,
    private router: Router
  ) {
  }

  login$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<authActions.LogIn>(
        authActions.AuthActionsTypes.LOGIN
      ),
      map((action: authActions.LogIn) => action.payload),
      switchMap((userCredentials: LoginModel) => {
        return this.authSrv.login(userCredentials).pipe(
          map(
            (userInfo) => {
              this.sharedSrv.showNotification('Logged in successfully', 'success');
              return new authActions.LogInSuccess(userInfo)
            }
          ),
          catchError((err) => {
            let errMsg: string;

            if (err.error.email) {
              errMsg = err.error.email.toString();
            } else if (err.error['non_field_errors'][0]) {
              errMsg = err.error['non_field_errors'][0];
            } else {
              errMsg = 'Invalid login credentials.';
            }
            this.sharedSrv.showNotification(errMsg, 'error');
            return of(new authActions.LogInFail(errMsg))
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

}
