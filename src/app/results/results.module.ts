import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { TestimonialsStudentsComponent } from './testimonials-students/testimonials-students.component';

import { AppUtilityModule } from '../app-utility/app-utility.module'

@NgModule({
  imports: [
    CommonModule,
    ResultsRoutingModule,
    AppUtilityModule
  ],
  declarations: [TestimonialsStudentsComponent]
})
export class ResultsModule { }
