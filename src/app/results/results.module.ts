import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { TestimonialsStudentsComponent } from './testimonials-students/testimonials-students.component';

@NgModule({
  imports: [
    CommonModule,
    ResultsRoutingModule
  ],
  declarations: [TestimonialsStudentsComponent]
})
export class ResultsModule { }
