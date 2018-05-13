import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestimonialsRoutingModule } from './testimonials-routing.module';
import { ResultComponent } from './result/result.component';

@NgModule({
  imports: [
    CommonModule,
    TestimonialsRoutingModule
  ],
  declarations: [ResultComponent],
  exports: [ResultComponent]
})
export class TestimonialsModule { }
