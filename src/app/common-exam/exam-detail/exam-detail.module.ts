import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamDetailComponent } from './exam-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ExamDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ExamDetailComponent]
})
export class ExamDetailModule { }
