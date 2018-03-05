import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginUserRoutingModule } from './login-user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginUserRoutingModule
  ],
  declarations: [LoginComponent]
})
export class LoginUserModule { }
