import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordLinkComponent } from './password-link/password-link.component';

import { LoginGuard } from '../guard-hub/login/login.guard';

const routes: Routes = [
  {
    path: "", children: [
      { path: "", component: LoginComponent, canDeactivate: [LoginGuard] },
      { path: "forgot_password", component: ForgotPasswordComponent, canDeactivate: [LoginGuard]  },
      { path: "password_link", component: PasswordLinkComponent, canDeactivate: [LoginGuard]  }
    ],

  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginUserRoutingModule { }
