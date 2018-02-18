import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AboutModule } from './about/about.module';

import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactUsModule } from './contact-us/contact-us.module';
import { RegisterUserModule } from './register-user/register-user.module';
import { PaymentModule } from './payment/payment.module';
import { DataTablesModule } from 'angular-datatables';



const myRoots: Routes = [
  {
    path: 'about',
    loadChildren: 'app/about/about.module#AboutModule'
  },
  {
    path: 'contactus',
    loadChildren: 'app/contact-us/contact-us.module#ContactUsModule'
  },
  {
    path: 'schedule',
    loadChildren: 'app/schedule/schedule.module#ScheduleModule'

  },
  {
    path: 'register/user',
    loadChildren: 'app/register-user/register-user.module#RegisterUserModule'
  },
  {
    path: 'payment',
    loadChildren: 'app/payment/payment.module#PaymentModule'
  },
  {
    path: '', component: AppHomeComponent
  },
  {
    path: 'pp-books',
    loadChildren: 'app/pp-books/pp-books.module#PpBooksModule'
  },
  { path: '', component: AppHomeComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppFooterComponent, AppHomeComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    NgbModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot(myRoots)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
