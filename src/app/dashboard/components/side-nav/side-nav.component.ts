import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as authActions from '../../../auth/state/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../auth/state/auth.reducer';

@Component({
  selector: 'naiparq-app-drawer',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @ViewChild('toggleTheme') 'toggleTheme': ElementRef;

  darkTheme: boolean = false;

  constructor(private cookie: CookieService, private store: Store<AuthState>) {}

  ngOnInit(): void {}

  handleClickTheme(): void {
    this.toggleTheme.nativeElement.click();
  }

  changeTheme(event: any): any {
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

  logOut(): void {
    this.store.dispatch(new authActions.LogOut());
  }
}
