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
    path: 'pp-books',
    loadChildren: 'app/pp-books/pp-books.module#PpBooksModule'
  },
  }, 
  {
    path: 'testimonials',
    loadChildren: 'app/results/results.module#ResultsModule'
  }
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
