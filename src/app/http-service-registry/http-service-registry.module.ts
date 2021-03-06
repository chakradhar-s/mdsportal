import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { LoginService } from './services/login-service.service';
import { ExamService } from './services/exam.service';
import { DataService } from './services/data.service';
import {  SignUpService} from './services/signup.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: [],
  providers: [LoginService, ExamService, DataService,SignUpService]
})
export class HttpServiceRegistryModule { }
