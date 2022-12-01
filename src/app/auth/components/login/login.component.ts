import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginModel, LoginResponseModel} from "../../model/login.model";
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {StorageService} from "../../../shared/services/storage.service";
import {SharedService} from "../../../shared/services/shared.service";
import {Router} from "@angular/router";

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
  // errMsg$: Observable<string> = this.store.select(getAuthMessage);
  isSubmitting: boolean = false;
  formInvalid: boolean = false;
  showPass: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authSrv: AuthService,
    private storageService: StorageService,
    private sharedSrv: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    const loginData: LoginModel = {
      phone_number: this.loginForm.value.phone,
      password: this.loginForm.value.password
    }
    this.isSubmitting = true

    this.authSrv.login(loginData).subscribe({
      next: (res: LoginResponseModel) => {


        this.isSubmitting = false;
        this.storageService.setToken(res.token);
        this.storageService.setUser(res.user);
        this.router.navigate(['/dashboard']);
        this.sharedSrv.showNotification('Logged in successfully.', 'success');

      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        let errMsg: string;

        if (err.error.email) {
          errMsg = err.error.email.toString();
        } else if (err.error['non_field_errors'][0]) {
          errMsg = err.error['non_field_errors'][0];
        } else {
          errMsg = 'Invalid login credentials.';
        }
        this.sharedSrv.showNotification(errMsg, 'error');
      }
    })

  }

}
