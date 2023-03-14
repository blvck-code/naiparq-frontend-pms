import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterModel } from '../../model/register.model';

// NgRx
import { Store } from '@ngrx/store';
import * as authActions from '../../state/auth.actions';

@Component({
  selector: 'naiparq-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.formBuilder.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    phone_number: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password1: ['', [Validators.required]],
    password2: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private store: Store<AuthService>
  ) {}

  ngOnInit(): void {}

  register(): void {
    const sigUpContent: RegisterModel = {
      first_name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name,
      phone_number: this.registerForm.value.phone_number,
      email: this.registerForm.value.email,
      password1: this.registerForm.value.password1,
      password2: this.registerForm.value.password2,
    };
    this.store.dispatch(new authActions.SignUp(sigUpContent));
  }
}
