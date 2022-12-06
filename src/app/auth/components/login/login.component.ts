import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {LoginModel} from "../../model/login.model";
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../../shared/services/storage.service";
import {SharedService} from "../../../shared/services/shared.service";
import {Router} from "@angular/router";

// NgRx
import { Store } from "@ngrx/store";
import * as authActions from '../../state/auth.actions';
import {AuthState} from "../../state/auth.reducer";
import {Observable} from "rxjs";
import {authMessage, isInvalid, isLoggedInLoading} from "../../state/auth.selector";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  errMsg$: Observable<string> = this.store.select(authMessage);
  isLoading$: Observable<boolean> = this.store.select(isLoggedInLoading);
  isInvalid$: Observable<boolean> = this.store.select(isInvalid);

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private store: Store<AuthState>,
    private sharedSrv: SharedService,
    private storageService: StorageService,
    private formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new authActions.ResetInvalid());
  }

  login(): void {
    const loginData: LoginModel = {
      phone_number: this.loginForm.value.phone,
      password: this.loginForm.value.password
    }
    this.store.dispatch(new authActions.LogIn(loginData));
  }

}
