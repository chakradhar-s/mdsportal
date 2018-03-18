import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterUserRoutingModule } from './register-user-routing.module';
import { RegisterUserComponent } from './register-user.component';
import { HttpServiceRegistryModule } from '../http-service-registry/http-service-registry.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterUserRoutingModule,
    HttpServiceRegistryModule
  ],
  declarations: [RegisterUserComponent]
})
export class RegisterUserModule { }
