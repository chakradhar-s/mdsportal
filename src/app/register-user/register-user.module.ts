import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterUserRoutingModule } from './register-user-routing.module';
import { RegisterUserComponent } from './register-user.component';
import { HttpServiceRegistryModule } from '../http-service-registry/http-service-registry.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterUserRoutingModule,
    HttpServiceRegistryModule,
    NgbModule
  ],
  declarations: [RegisterUserComponent]
})
export class RegisterUserModule { }
