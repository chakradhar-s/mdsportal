import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUserRoutingModule } from './register-user-routing.module';
import { RegisterUserComponent } from './register-user.component';

@NgModule({
  imports: [
    CommonModule,
    RegisterUserRoutingModule
  ],
  declarations: [RegisterUserComponent]
})
export class RegisterUserModule { }
