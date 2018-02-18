import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TestimonialsStudentsComponent } from './testimonials-students/testimonials-students.component';

const routes: Routes = [{path:'',component:TestimonialsStudentsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
