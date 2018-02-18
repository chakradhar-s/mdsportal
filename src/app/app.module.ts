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
import { RegisterUserModule } from './register-user/register-user.module';
import { AboutModule } from './about/about.module';

const myRoots: Routes = [

  {
    path: 'about',
    loadChildren: 'app/about/about.module#AboutModule'
  },
  {
    path: 'contactus',
    loadChildren: 'app/contact-us/contact-us.module#ContactUsModule'
  },  
  { path: 'register/user',
    loadChildren: 'app/register-user/register-user.module#RegisterUserModule'
  },
  {
    path: '', component: AppHomeComponent
  },
  {
    path: 'home', component: AppHomeComponent
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
    NgbModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot(myRoots)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
