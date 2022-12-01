import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.loginForm.value)
    this.isSubmitting = !this.isSubmitting
  }

}
