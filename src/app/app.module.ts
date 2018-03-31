import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { LoginNavItem } from './app-navbar/login-navitem.component';

import { ContactUsModule } from './contact-us/contact-us.module';
import { ScheduleModule } from './schedule/schedule.module';

import { HttpServiceRegistryModule } from './http-service-registry/http-service-registry.module';

import { AppUtilityModule } from './app-utility/app-utility.module';

import { HttpModule } from '@angular/http';


import { DataTablesModule } from 'angular-datatables';
import { QuestionpaperComponent } from './questionpaper/questionpaper.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FileUploadService } from './mdsportal.services/file.upload.service';
import { FileUploadModule } from 'primeng/fileupload';

import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { QuestionpaperService } from './mdsportal.services/questionpaper.service';

import { LoginUserModule } from './login-user/login-user.module';
import { RegisterUserModule } from './register-user/register-user.module';
import { UserProfileModule } from './user-profile/user-profile.module';

import { GuardHubModule } from './guard-hub/guard-hub.module';
import { AuthGuard } from './guard-hub/auth/auth.guard';
import { ViewResolve } from './guard-hub/resolve/view.resolve';

import { ViewUserGuard } from './guard-hub/view-user/view-user.guard';
import { MainExamComponent } from './main-exam/main-exam.component';

import { } from "./demo-exam/demo-exam.module"

const myRoots: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: AppHomeComponent
  },
  {
    path: 'about',
    loadChildren: 'app/about/about.module#AboutModule'
  },
  {
    path: 'contactus',
    loadChildren: 'app/contact-us/contact-us.module#ContactUsModule'
  },
  {
    path: 'schedule-pp-books',
    loadChildren: 'app/schedule/schedule.module#ScheduleModule'
  },
  { path: '', component: AppHomeComponent },
  {
    path: 'payment',
    loadChildren: 'app/payment/payment.module#PaymentModule'
  },
  {
    path: 'testimonials',
    loadChildren: 'app/results/results.module#ResultsModule'
  },
  {
    path: 's-strategy',
    loadChildren: 'app/s-strategy/s-strategy.module#SStrategyModule'
  },
  {
    path: 'question-upload',
    component: QuestionpaperComponent
  },
  {
    path: 'demo-exam/:paperid',
    loadChildren: 'app/demo-exam/demo-exam.module#DemoExamModule'
  },
  {
    path: 'taketest',
    loadChildren: 'app/take-exam/take-exam.module#TakeExamModule'
  },
  {
    path: 'main-exam/:paperid',
    loadChildren: 'app/main-exam/main-exam.module#MainExamModule'
  },
];


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppFooterComponent,
    AppHomeComponent,
    LoginNavItem,
    QuestionpaperComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    DataTablesModule,
    AppUtilityModule,
    HttpModule,
    LoginUserModule,
    RegisterUserModule,
    UserProfileModule,
    GuardHubModule,
    NgbModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot(myRoots
      // , { enableTracing: true } //--> uncomment this for debugging
    ),
    BrowserAnimationsModule,
    FileUploadModule,
    HttpClientModule,
    HttpServiceRegistryModule,
    TableModule
  ],
  providers: [FileUploadService, QuestionpaperService],
  bootstrap: [AppComponent],
  exports: [HttpServiceRegistryModule]
})
export class AppModule { }
