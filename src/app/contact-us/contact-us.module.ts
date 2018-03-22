import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';

import { AppUtilityModule } from '../app-utility/app-utility.module';

@NgModule({
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    AppUtilityModule
  ],
  declarations: [ContactUsComponent]
})
export class ContactUsModule { }
