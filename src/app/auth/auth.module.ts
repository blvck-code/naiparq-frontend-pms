import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ResetComponent } from './components/reset/reset.component';
import { ConfirmResetComponent } from './components/confirm-reset/confirm-reset.component';
import { AuthComponent } from './auth.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    ResetComponent,
    ConfirmResetComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
