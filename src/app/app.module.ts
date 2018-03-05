import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppHomeComponent } from './app-home/app-home.component';

import { ContactUsModule } from './contact-us/contact-us.module';
import { ScheduleModule } from './schedule/schedule.module';

import { DataTablesModule } from 'angular-datatables';

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
  }
];


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppFooterComponent, 
    AppHomeComponent
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
