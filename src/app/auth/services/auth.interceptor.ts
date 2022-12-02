import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { BehaviorSubject, filter, Observable, switchMap, take } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';

// NgRx
import { Store } from '@ngrx/store';
import {TokenModel} from "../model/user.model";
import {AuthState} from "../state/auth.reducer";
import {userToken} from "../state/auth.selector";
// import { AppState } from '../../app.state';
// import { getToken } from '../state/auth.selectors';
// import { TokenModel } from '../models/userInfo.model';
// import * as authActions from '../state/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: any = {
    access: '',
    refresh: '',
    expTime: '',
  };
  private refreshTokenInProgress: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private storageService: StorageService,
    private store: Store<AuthState>
  ) {
    this.store.select(userToken).subscribe((data: TokenModel | null) => {
      if (
        this.token.access == '' ||
        this.token.refresh !== this.getAccessToken(data)
      ) {
        this.token.access = this.getAccessToken(data);
        this.token.refresh = this.getRefreshToken(data);
        this.token.expTime = data?.expiry_time;
        this.refreshTokenSubject.next(this.token.refresh);
      }
    });
  }

  validateURL(request: any): boolean {
    return (
      request.url.includes('/api/v1/accounts/login') ||
      request.url.includes('/api/v1/accounts/register') ||
      request.url.includes('/api/v1/accounts/password/reset/')
    )
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Todo add forgot password and verify urls
    if (
      this.validateURL(request)
    ) {
      return next.handle(request);
    }

    this.refreshTokenInProgress = this.isRefreshTokenProgress(
      this.token.access,
      this.token.expTime
    );

    if (this.refreshTokenInProgress) {
      // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
      // – which means the new token is ready, and we can retry the request again
      return this.refreshTokenSubject.pipe(
        filter((result) => result !== null),
        take(1),
        switchMap(() => next.handle(this.addAuthenticationToken(request)))
      );
    } else {
      // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
      this.refreshTokenSubject.next(null);
      return next.handle(this.addAuthenticationToken(request));
    }
  }

  private isExpired(expTime: string): boolean {
    let currentTimeInMilli = new Date().getTime();
    if (+expTime < currentTimeInMilli) {
      console.warn('Token Expired!');
      return true;
    }
    return false;
  }

  private getAccessToken(data: TokenModel | null): string {
    if (data && data.access) {
      return data.refresh;
    } else {
      return '';
    }
  }

  private getRefreshToken(data: TokenModel | null) {
    if (data && data.access) {
      return data.refresh;
    } else {
      return null;
    }
  }

  addAuthenticationToken(request: HttpRequest<any>) {
    // Get Access Token from Local Storage
    const accessToken = this.token.access;

    if (!accessToken) {
      console.log('Request ==>>', request)
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    // return newRequest;
  }

  isRefreshTokenProgress(accessToken: string, expTime: string) {
    if (this.isExpired(expTime)) {
      // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
      this.refreshTokenSubject.next(null);
      //' Todo Add refresh token
      // this.store.dispatch(new authActions.RefreshToken(this.token.refresh))
      return false;
    } else {
      return false;
    }
  }
}
