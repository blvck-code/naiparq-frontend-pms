import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUrl: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onInitHandler();
  }


  changeTheme(event: any): void {
    const checked = event.checked;

    if (checked) {
      document.body.classList.add('dark-theme');
    } else {
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
  }

  getCurrentUrl(url: string): string {
    let newUrl = '';
    if (url === '/dashboard') {
      newUrl = 'Dashboard';
    } else if (url === '/dashboard/notifications') {
      newUrl = 'Notifications';
    } else if (url === '/dashboard/cash-payment') {
      newUrl = 'Cash Payment';
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
