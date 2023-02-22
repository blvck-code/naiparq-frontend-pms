import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { isLoggedIn, userInfo } from '../state/auth.selector';
import { SharedService } from '../../shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class BloggerGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private sharedSrv: SharedService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let isLogged: boolean = false;
    let isSuperUser: boolean | undefined = false;
    let userType: string = '';

    this.store.select(isLoggedIn).subscribe({
      next: (status) => {
        isLogged = status;
      },
    });

    this.store.select(userInfo).subscribe({
      next: (userDetails) => {
        userType = userDetails.user_type;
        isSuperUser = userDetails.is_superuser;
      },
    });

    if (isLogged && (userType === 'blogger' || isSuperUser)) {
      return true;
    } else {
      this.sharedSrv.showNotification(
        'You are not allowed to access this page.',
        'error'
      );
      this.router.navigate(['/']);
      return false;
    }
  }
}
