import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppHomeComponent } from './app-home/app-home.component';

import { DataTablesModule } from 'angular-datatables';
import { QuestionpaperComponent } from './questionpaper/questionpaper.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FileUploadService } from './mdsportal.services/file.upload.service';
import {FileUploadModule} from 'primeng/fileupload';

import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { QuestionpaperService } from './mdsportal.services/questionpaper.service'; 

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
    path: 'register/user',
    loadChildren: 'app/register-user/register-user.module#RegisterUserModule'
  },
  {
    path: 'login/user',
    loadChildren: 'app/login-user/login-user.module#LoginUserModule'
  },
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
  }
];


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppFooterComponent, AppHomeComponent, QuestionpaperComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    NgbModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot(myRoots),
    BrowserAnimationsModule,
    FileUploadModule,
    HttpClientModule,
    TableModule
  ],
  providers: [FileUploadService,QuestionpaperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
