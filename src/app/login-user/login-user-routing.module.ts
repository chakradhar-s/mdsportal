import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {PasswordLinkComponent } from './password-link/password-link.component';

const routes: Routes = [
  {
    path: "", children: [
      { path: "", component: LoginComponent },
      { path: "forgot_password", component: ForgotPasswordComponent },
      { path: "password_link", component: PasswordLinkComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginUserRoutingModule { }
