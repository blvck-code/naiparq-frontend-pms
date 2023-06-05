import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { LoginModel } from '../../model/login.model';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../../shared/services/storage.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Router } from '@angular/router';

// NgRx
import { Store } from '@ngrx/store';
import * as authActions from '../../state/auth.actions';
import { AuthState } from '../../state/auth.reducer';
import { Observable } from 'rxjs';
import { authMessage, isLoggedInLoading } from '../../state/auth.selector';

@Component({
  selector: 'naiparq-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /**
   *  Boolean for toggling password
   */
  showPass: boolean = false;
  /**
   *  Boolean for checking if form is invalid
   */
  formInvalid: boolean = false;
  /**
   *  Boolean for showing loading indicator in button
   */
  btnLoading: boolean = false;

  /**
   *  Form group for login form data
   */
  loginForm = this.formBuilder.group({
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  /**
   *  Login error message observable
   */
  errMsg$: Observable<string> = this.store.select(authMessage);
  /**
   *  Is loading indicator if form is being submitted
   */
  isLoading$: Observable<boolean> = this.store.select(isLoggedInLoading);

  /**
   * @param router for router navigation
   * @param authSrv for AuthServices
   * @param store for NgRx store
   * @param sharedSrv for Shared Services
   * @param storageService for localStorage Services
   * @param formBuilder for form data
   */
  constructor(
    private router: Router,
    private authSrv: AuthService,
    private store: Store<AuthState>,
    private sharedSrv: SharedService,
    private storageService: StorageService,
    private formBuilder: UntypedFormBuilder
  ) {}

  /**
   * For functions fired when page is loaded for the first time
   * @ignore
   */
  ngOnInit(): void {
    this.store.dispatch(new authActions.ResetInvalid());
    this.handleError();
  }

  /**
   * @param link Target for page redirecting
   * @returns Redirects to given parameter
   */
  redirectRoute(link: string): void {
    this.authSrv.redirectRoute(link);
  }

  /**
   *  Confirms the message from login is an error message
   *  @returns Resets form error messages
   */
  handleError(): void {
    this.errMsg$.subscribe({
      next: (message) => {
        if (!message.length) {
          return;
        }

        if (message !== 'Login Successful') {
          this.formInvalid = true;
        }
      },
    });
  }

  /**
   * @param toogle Input to determine show or hide password
   * @returns Toggles show or hide password
   */
  togglePass(toogle: string): void {
    this.showPass = toogle === 'show';
  }

  /**
   *  Reset error messages when form is submitted
   *  @returns Resets input error messages
   */
  resetInput(): void {
    this.formInvalid = false;
  }

  /**
   * Log in function fired when user submits credentials
   * @returns Log in user
   */
  login(): void {
    const loginData: LoginModel = {
      phone_number: this.loginForm.value.phone,
      password: this.loginForm.value.password,
    };
    this.store.dispatch(new authActions.LogIn(loginData));
  }
}
