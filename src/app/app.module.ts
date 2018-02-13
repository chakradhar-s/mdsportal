import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppLoaderComponent } from './app-loader/app-loader.component';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,    
    AppFooterComponent,
    AppLoaderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
