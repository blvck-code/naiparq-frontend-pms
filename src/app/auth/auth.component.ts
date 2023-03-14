import { Component, OnInit } from '@angular/core';

// NgRx
import { Store } from '@ngrx/store';
import * as authActions from '../auth/state/auth.actions';
import { AuthState } from './state/auth.reducer';
import { Observable } from 'rxjs';
import { isLoggedIn } from './state/auth.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'naiparq-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = this.store.select(isLoggedIn);

  constructor(private store: Store<AuthState>, private router: Router) {}

  ngOnInit(): void {
    this.redirectPage();
  }

  // Redirects to dashboard if logged in
  redirectPage(): void {
    this.isLoggedIn$.subscribe({
      next: (isLoggedIn) => {
        if (!isLoggedIn) {
          return;
        }

        this.router.navigate(['/dashboard']);
      },
    });
  }
}
