import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

import { AppUtilityModule } from '../app-utility/app-utility.module';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    AppUtilityModule
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule { }
