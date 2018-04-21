import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { LoginService } from './services/login-service.service';
import { ExamService } from './services/exam.service';
import { SignUpService } from './services/signup.service';
import { UserResultsService } from './services/user-results.service';
import { UserManagementService } from './services/user-management.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: [],
  providers: [LoginService, ExamService, SignUpService, UserResultsService, UserManagementService]
})
export class HttpServiceRegistryModule { }
