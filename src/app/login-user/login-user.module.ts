import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { LoginUserRoutingModule } from './login-user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginUserRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginUserModule { }
