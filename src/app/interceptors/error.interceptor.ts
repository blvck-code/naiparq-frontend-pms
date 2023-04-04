import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorModel } from '../shared/models/error.model';

// NgRx
import { Store } from '@ngrx/store';
import * as authActions from '../auth/state/auth.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  error: ErrorModel = {};

  constructor(private store: Store) {}

  handleError = (err: HttpErrorResponse): ErrorModel => {
    let errMsg: string;
    console.log('First time error ==>>>', err);
    console.log('Ip address ==>>>', err.error.ip_address[0]);

    if (err.error.email) {
      errMsg = err.error.email.toString();
    } else if (err.error.ip_address[0] === 'Enter a valid URL') {
      errMsg = 'Enter valid URL for ip address';
    } else if (err.error.phone_number) {
      errMsg = err.error.phone_number.toString();
    } else if (err.error['non_field_errors'][0]) {
      errMsg = err.error['non_field_errors'][0];
    } else {
      errMsg = 'Unknown error, please try again.';
    }

    this.error = {
      message: errMsg,
      status: err.status,
    };
    console.log('Final error content ==>>', this.error);
    return this.error;
  };

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Unauthorised User Access
        if (error.status === 401 || error.status === 403) {
          this.store.dispatch(new authActions.LogOut());
        }
        // Client Side Error
        if (error instanceof ErrorEvent) {
          console.log('Client side error ==>>', error);
          this.handleError(error);
        } else {
          // Server Side Error
          console.log('Server side error ==>>', error);
          this.handleError(error);
        }

        return throwError(() => this.handleError(error));
      })
    );
  }
}
