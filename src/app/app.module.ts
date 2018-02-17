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

const myRoots: Routes = [

  {
    path: 'about',
    loadChildren: 'app/about/about.module#AboutModule'
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
    AboutModule,
    NgbModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot(myRoots)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
