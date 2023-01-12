import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

// NgRx
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/state/auth.reducer';

import * as authActions from '../auth/state/auth.actions';
import * as spaceActions from './state/actions/spaces.actions';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { isLoggedIn, userInfo, userName } from '../auth/state/auth.selector';
import { UserModel } from '../auth/model/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUrl: string = '';
  darkTheme: boolean = false;
  @ViewChild('toggleTheme') 'toggleTheme': ElementRef;
  @ViewChild('sideNav') 'sideNav': ElementRef;

  userName$: Observable<string> = this.store.select(userName);
  isLoggedIn$: Observable<boolean> = this.store.select(isLoggedIn);
  userInfo$: Observable<UserModel> = this.store.select(userInfo);

  toggleNav(): void {
    const nav = this.sideNav.nativeElement;
    nav.classList.toggle('hide');
  }
  constructor(
    private router: Router,
    private store: Store<AuthState>,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {
    this.onInitHandler();
    this.initState();
  }

  handleClickTheme(): void {
    this.toggleTheme.nativeElement.click();
  }

  changeTheme(event: any): void {
    const checked = event.checked;

    if (checked) {
      this.darkTheme = true;
      document.body.classList.add('dark-theme');
      this.cookie.set('theme', 'dark-theme', 30);
    } else {
      this.darkTheme = false;
      document.body.classList.remove('dark-theme');
      this.cookie.set('theme', 'light-theme', 30);
    }
  }

  checkTheme(): void {
    const theme = this.cookie.get('theme');

    if (theme === 'dark-theme') {
      this.darkTheme = true;
      document.body.classList.add('dark-theme');
    } else {
      this.darkTheme = false;
      document.body.classList.remove('dark-theme');
    }
  }

  // Todo Uncomment to fetch spaces
  initState(): void {
    // this.store.dispatch(new spaceActions.LoadSpaces());
    console.log('Getting profile');
    this.isLoggedIn$.subscribe({
      next: (isLoggedIn) => {
        if (!isLoggedIn) {
          return;
        }
        this.store.dispatch(new authActions.LoadProfile());
      },
    });
  }

  onInitHandler(): void {
    this.currentUrl = this.getCurrentUrl(this.router.url);
    this.router.events.subscribe({
      next: (events) => {
        if (events instanceof NavigationEnd) {
          this.currentUrl = this.getCurrentUrl(events.url);
        }
      },
    });

    this.checkTheme();
  }

  logOut(): void {
    this.store.dispatch(new authActions.LogOut());
  }

  getCurrentUrl(url: string): string {
    let newUrl = '';
    if (url === '/dashboard') {
      newUrl = 'Dashboard';
    } else if (url === '/dashboard/premises') {
      newUrl = 'Space';
    } else if (url === '/dashboard/notifications') {
      newUrl = 'Notifications';
    } else if (url === '/dashboard/cash-payment') {
      newUrl = 'Drive In';
    } else if (url === '/dashboard/motorist-management') {
      newUrl = 'Motorist Management';
    } else if (url === '/dashboard/drive-in') {
      newUrl = 'Drive In';
    } else if (url === '/dashboard/settings') {
      newUrl = 'Settings';
    } else if (url === '/dashboard/account') {
      newUrl = 'Account';
    } else if (url === '/dashboard/asset-management') {
      newUrl = 'Asset Management';
    } else if (url === '/dashboard/user-management') {
      newUrl = 'User Management';
    } else if (url === '/dashboard/logs') {
      newUrl = 'Logs';
    } else if (url === '/dashboard/revenues') {
      newUrl = 'Revenues';
    } else if (url === '/dashboard/analytics') {
      newUrl = 'Analytics';
    }
    return newUrl;
  }
}
