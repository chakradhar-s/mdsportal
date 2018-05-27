import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TestimonialsRoutingModule } from './testimonials-routing.module';
import { ResultComponent } from './result/result.component';

@NgModule({
  imports: [
    CommonModule,
    TestimonialsRoutingModule,
    NgbModule
  ],
  declarations: [ResultComponent],
  exports: [ResultComponent]
})
export class TestimonialsModule { }
