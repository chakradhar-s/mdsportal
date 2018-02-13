import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LoadersCssModule } from 'angular2-loaders-css';

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
    LoadersCssModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
