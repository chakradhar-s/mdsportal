import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginGuard } from './login/login.guard';
import { AuthGuard } from './auth/auth.guard';
import { ViewUserGuard } from './view-user/view-user.guard';

import { HttpServiceRegistryModule } from '../http-service-registry/http-service-registry.module';
import { ViewResolve } from './resolve/view.resolve';

import { ViewQuestionPapersResolve } from './resolve/view-questionpapers.resolve';
import { VerifyGuard } from './verify/verify.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpServiceRegistryModule
  ],
  declarations: [],
  providers: [
    LoginGuard,
    AuthGuard,
    ViewUserGuard,
    ViewResolve,
    ViewQuestionPapersResolve,
    VerifyGuard
  ]
})
export class GuardHubModule { }
