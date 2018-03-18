import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { LoginUserRoutingModule } from './login-user-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordLinkComponent } from './password-link/password-link.component';
import { GuardHubModule } from '../guard-hub/guard-hub.module';

@NgModule({
  imports: [
    CommonModule,
    LoginUserRoutingModule,
    ReactiveFormsModule,
    GuardHubModule
  ],
  declarations: [LoginComponent, ForgotPasswordComponent, PasswordLinkComponent]
})
export class LoginUserModule { }
