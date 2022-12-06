import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

// NgRx
import {Store} from "@ngrx/store";
import {AuthState} from "../auth/state/auth.reducer";

import * as authActions from '../auth/state/auth.actions';
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {userName} from "../auth/state/auth.selector";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUrl: string = '';
  darkTheme: boolean = false;
  @ViewChild('toggleTheme') 'toggleTheme': ElementRef

  userName$: Observable<string> = this.store.select(userName);

  constructor(
    private router: Router,
    private store: Store<AuthState>,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.onInitHandler();
  }

  handleClickTheme(): void {
    this.toggleTheme.nativeElement.click()
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

    if (theme === 'dark-theme'){
      this.darkTheme = true;
      document.body.classList.add('dark-theme');
    } else {
      this.darkTheme = false;
      document.body.classList.remove('dark-theme');
    }
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
    this.store.dispatch(new authActions.LogOut())
  }

  getCurrentUrl(url: string): string {
    let newUrl = '';
    if (url === '/dashboard') {
      newUrl = 'Dashboard';
    } else if (url === '/dashboard/notifications') {
      newUrl = 'Notifications';
    } else if (url === '/dashboard/cash-payment') {
      newUrl = 'Drive In';
    } else if (url === '/dashboard/motorist-management') {
      newUrl = 'Motorist Management';
    } else if (url === '/dashboard/settings') {
      newUrl = 'Settings';
    } else if (url === '/dashboard/account') {
      newUrl = 'Account';
    } else if (url === '/dashboard/asset-management') {
      newUrl = 'Asset Management';
    }
    return newUrl;
  }

}
